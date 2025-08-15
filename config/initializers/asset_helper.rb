# frozen_string_literal: true

module AssetHelper
  FRONT_SERVER_URL = Rails.env.development? && ENV["FRONT_SERVER_URL"]
  MANIFEST_PATH = "dist/manifest.json"
  MANIFEST = !FRONT_SERVER_URL && JSON.parse(File.read(MANIFEST_PATH)).freeze

  URI_REGEXP = %r{^[-a-z]+://|^(?:cid|data):|^//}i

  # Propshaft によるアセット管理と独自のアセット管理を両立するためにヘルパー
  # Rails 標準の javascript_include_tag をコピーして、メソッド名を変更している
  # @override
  def legacy_javascript_include_tag(*sources)
    options = sources.extract_options!.stringify_keys
    path_options = options.extract!("protocol", "extname", "host", "skip_pipeline").symbolize_keys
    preload_links = []
    use_preload_links_header = options["preload_links_header"].nil? ? preload_links_header : options.delete("preload_links_header")
    nopush = options["nopush"].nil? ? true : options.delete("nopush")
    crossorigin = options.delete("crossorigin")
    crossorigin = "anonymous" if crossorigin == true
    integrity = options["integrity"]
    rel = options["type"] == "module" ? "modulepreload" : "preload"

    sources_tags = sources.uniq.map { |source|
      href = legacy_asset_path(source, { type: :javascript }.merge!(path_options))
      if use_preload_links_header && !options["defer"] && href.present? && !href.start_with?("data:")
        preload_link = "<#{href}>; rel=#{rel}; as=script"
        preload_link += "; crossorigin=#{crossorigin}" unless crossorigin.nil?
        preload_link += "; integrity=#{integrity}" unless integrity.nil?
        preload_link += "; nopush" if nopush
        preload_links << preload_link
      end
      tag_options = {
        "src" => href,
        "crossorigin" => crossorigin
      }.merge!(options)
      if tag_options["nonce"] == true
        tag_options["nonce"] = content_security_policy_nonce
      end
      content_tag("script", "", tag_options)
    }.join("\n").html_safe

    if use_preload_links_header
      send_preload_links_header(preload_links)
    end

    sources_tags
  end

  # Propshaft によるアセット管理と独自のアセット管理を両立するためにヘルパー
  # Rails 標準の asset_path をコピーして、メソッド名を変更している
  # @override
  def legacy_asset_path(source, options = {})
    raise ArgumentError, "nil is not a valid asset source" if source.nil?

    source = source.to_s
    return "" if source.blank?
    return source if URI_REGEXP.match?(source)

    tail, source = source[/([?#].+)$/], source.sub(/([?#].+)$/, "")

    if extname = compute_asset_extname(source, options)
      source = "#{source}#{extname}"
    end

    unless source.start_with?(?/)
      if options[:skip_pipeline]
        source = public_compute_asset_path(source, options)
      else
        source = legacy_compute_asset_path(source, options)
      end
    end

    relative_url_root = defined?(config.relative_url_root) && config.relative_url_root
    if relative_url_root
      source = File.join(relative_url_root, source) unless source.start_with?("#{relative_url_root}/")
    end

    if host = compute_asset_host(source, options)
      source = File.join(host, source)
    end

    "#{source}#{tail}"
  end

  # @override
  # @see https://github.com/rails/rails/blob/v7.0.6/actionview/lib/action_view/helpers/asset_url_helper.rb#L262-L265
  #
  # アセットの論理名から物理名を解決する。
  # 論理名にはプロジェクトルートからのパスを指定する。
  # 拡張子が .js や .css ではないファイルを扱ったり、ES Modules を利用したりするため、以下のように利用すること。
  #
  #   legacy_javascript_include_tag('front/home/index.tsx', crossorigin: '', type: 'module', extname: false)
  #
  # 指定したアセットの論理名は、以下のように利用される。
  # - development 環境においては、アセット開発サーバに対するリクエストパスとして直接利用される
  # - production 環境においては、manifest ファイルを参照して論理名から実体名を解決するために利用される
  def legacy_compute_asset_path(path, _options = {})
    MANIFEST ? "/#{MANIFEST.dig(path, 'file')}" || path : "#{FRONT_SERVER_URL}/#{path}"
  end
end

ActiveSupport.on_load(:action_view) { include AssetHelper }

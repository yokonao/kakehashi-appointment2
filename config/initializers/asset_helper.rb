# frozen_string_literal: true

module AssetHelper
  FRONT_SERVER_URL = Rails.env.development? && ENV['FRONT_SERVER_URL']
  MANIFEST_PATH = 'dist/manifest.json'
  MANIFEST = !FRONT_SERVER_URL && JSON.parse(File.read(MANIFEST_PATH)).freeze

  # @override
  # @see https://github.com/rails/rails/blob/v7.0.6/actionview/lib/action_view/helpers/asset_url_helper.rb#L262-L265
  #
  # アセットの論理名から物理名を解決する。
  # 論理名にはプロジェクトルートからのパスを指定する。
  # 拡張子が .js や .css ではないファイルを扱ったり、ES Modules を利用したりするため、以下のように利用すること。
  #
  #   javascript_include_tag('front/home/index.tsx', crossorigin: '', type: 'module', extname: false)
  #   stylesheet_link_tag('front/home/index.scss', extname: false)
  #
  # 指定したアセットの論理名は、以下のように利用される。
  # - development 環境においては、アセット開発サーバに対するリクエストパスとして直接利用される
  # - production 環境においては、manifest ファイルを参照して論理名から実体名を解決するために利用される
  def compute_asset_path(path, _options = {})
    MANIFEST ? "/#{MANIFEST.dig(path, 'file')}" || path : "#{FRONT_SERVER_URL}/#{path}"
  end
end

ActiveSupport.on_load(:action_view) { include AssetHelper }

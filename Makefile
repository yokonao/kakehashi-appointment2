# Dependencies
.PHONY: update.gem update.npm
update.gem:
	gem install bundler
	bundle update --bundler
	bundle update

update.npm:
	yarn set version canary
	yarn up '*'

# Testing
.PHONY: test test.system test.acceptance
test:
	bundle ex rspec spec --exclude-pattern 'spec/system/**/*_spec.rb'

test.system:
	bundle ex rspec spec/system

test.acceptance:
	yarn typecheck
	bin/rake assets:precompile
	$(MAKE) test
	$(MAKE) test.system

# Deploy
.PHONY: deploy
deploy:
	git pull origin main
	git push heroku main

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
	bin/rails test

test.system:
	bin/rails test test/system

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

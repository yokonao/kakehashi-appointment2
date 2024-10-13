# Testing
.PHONY: test test.system test.acceptance
test:
	bundle ex rspec spec --exclude-pattern 'spec/system/**/*_spec.rb'

test.system:
	bundle ex rspec spec/system

test.acceptance:
	bundle ex rspec spec
	bin/rake assets:precompile

# Deploy
.PHONY: deploy
deploy:
	git pull origin main
	git push heroku main

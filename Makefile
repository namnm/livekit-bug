clean:
	yarn \
	&& rm -rf ios/build/* ~/Library/Developer/Xcode/DerivedData/* \
	&& cd ios \
	&& rm -rf Podfile.lock \
	&& pod install --repo-update \
	&& cd .. \
	&& yarn jetify \
	&& cd android && ./gradlew clean;

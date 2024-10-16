#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <livekit-react-native-webrtc/WebRTCModuleOptions.h>
#import <WebRTC/RTCLogging.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"LivekitBug";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  WebRTCModuleOptions *options = [WebRTCModuleOptions sharedInstance];
  options.loggingSeverity = RTCLoggingSeverityInfo;

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end

#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>

#import "RNSScreen.h"

typedef NS_ENUM(NSInteger, RNSStatusBarStyle) {
  RNSStatusBarStyleAuto,
  RNSStatusBarStyleInverted,
  RNSStatusBarStyleLight,
  RNSStatusBarStyleDark,
};

@interface RNSScreenStackHeaderConfig : UIView

@property (nonatomic, weak) RNSScreenView *screenView;

@property (nonatomic, retain) NSString *title;
@property (nonatomic, retain) NSString *titleFontFamily;
@property (nonatomic, retain) NSNumber *titleFontSize;
@property (nonatomic, retain) NSString *titleFontWeight;
@property (nonatomic, retain) UIColor *titleColor;
@property (nonatomic, retain) NSString *backTitle;
@property (nonatomic, retain) NSString *backTitleFontFamily;
@property (nonatomic, retain) NSNumber *backTitleFontSize;
@property (nonatomic, retain) UIColor *backgroundColor;
@property (nonatomic) UIBlurEffectStyle blurEffect;
@property (nonatomic, retain) UIColor *color;
@property (nonatomic) BOOL hide;
@property (nonatomic) BOOL largeTitle;
@property (nonatomic, retain) NSString *largeTitleFontFamily;
@property (nonatomic, retain) NSNumber *largeTitleFontSize;
@property (nonatomic, retain) NSString *largeTitleFontWeight;
@property (nonatomic, retain) UIColor *largeTitleBackgroundColor;
@property (nonatomic) BOOL largeTitleHideShadow;
@property (nonatomic, retain) UIColor *largeTitleColor;
@property (nonatomic) BOOL hideBackButton;
@property (nonatomic) BOOL backButtonInCustomView;
@property (nonatomic) BOOL hideShadow;
@property (nonatomic) BOOL translucent;
@property (nonatomic) UISemanticContentAttribute direction;
@property (nonatomic) RNSStatusBarStyle statusBarStyle;
@property (nonatomic) UIStatusBarAnimation statusBarAnimation;
@property (nonatomic) BOOL statusBarHidden;

+ (void)willShowViewController:(UIViewController *)vc animated:(BOOL)animated withConfig:(RNSScreenStackHeaderConfig*)config;
+ (void)updateStatusBarAppearance;
+ (UIStatusBarStyle)statusBarStyleForRNSStatusBarStyle:(RNSStatusBarStyle)statusBarStyle;

@end

@interface RNSScreenStackHeaderConfigManager : RCTViewManager

@end

typedef NS_ENUM(NSInteger, RNSScreenStackHeaderSubviewType) {
  RNSScreenStackHeaderSubviewTypeBackButton,
  RNSScreenStackHeaderSubviewTypeLeft,
  RNSScreenStackHeaderSubviewTypeRight,
  RNSScreenStackHeaderSubviewTypeTitle,
  RNSScreenStackHeaderSubviewTypeCenter,
};

@interface RCTConvert (RNSScreenStackHeader)

+ (RNSScreenStackHeaderSubviewType)RNSScreenStackHeaderSubviewType:(id)json;
+ (UIBlurEffectStyle)UIBlurEffectStyle:(id)json;
+ (UISemanticContentAttribute)UISemanticContentAttribute:(id)json;
+ (RNSStatusBarStyle)RNSStatusBarStyle:(id)json;

@end

@interface RNSScreenStackHeaderSubviewManager : RCTViewManager

@property (nonatomic) RNSScreenStackHeaderSubviewType type;

@end

//
//  ViewController.m
//  Mandelbrot
//
//  Created by betahuang on 15/4/13.
//  Copyright (c) 2015年 betahuang. All rights reserved.
//

#import "ViewController.h"
#import "ComplexNumber.h"
#import "BorderView.h"

#define MAX_ITERATIONS 50

@interface ViewController ()
@property(nonatomic, assign) int maxEscapeTime;
@property(nonatomic, assign) CGRect parameterRect;
@property(nonatomic, assign) CGPoint startPoint;
@property(nonatomic, strong) BorderView* borderView;
@property(nonatomic, assign) BOOL colored;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    self.view.backgroundColor = [UIColor darkGrayColor];
    
    _maxEscapeTime = MAX_ITERATIONS;
    _colored = NO;
    
    _colors = (float*)malloc(sizeof(float) * (_maxEscapeTime + 1) * 3);
    
    
    for (int i = 0; i <= _maxEscapeTime; i++) {
        _colors[i * 3] = (float)i / _maxEscapeTime; //h
        _colors[i * 3 + 1] = 1.0;                     //s
        _colors[i * 3 + 2] = 1.0 - _colors[i] * _colors[i];            //b
    }
    
    CGSize size;
    size.width = MIN(self.view.frame.size.width, self.view.frame.size.height);
    size.height = size.width;
    
    CGRect frame = CGRectMake((self.view.frame.size.width - size.width) / 2, (self.view.frame.size.height - size.height) / 2, size.width, size.height);
    self.imageView = [[UIImageView alloc] initWithFrame:frame];
    [self.view addSubview:self.imageView];
    self.parameterRect = CGRectMake(-2.0, -2.0, 4.0, 4.0);
    
    UILongPressGestureRecognizer *gesture = [[UILongPressGestureRecognizer alloc] initWithTarget:self
                                            action:@selector(handleGesture:)];
    [self.imageView addGestureRecognizer:gesture];
    self.imageView.backgroundColor = [UIColor whiteColor];
    self.imageView.userInteractionEnabled = YES;
    
//    if (!self.borderView) {
//        self.borderView = [[BorderView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
//        self.borderView.backgroundColor = [UIColor clearColor];
//        [self.imageView addSubview:self.borderView];
//    }
    
    [self generateMandelbrotImage];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

-(int)calcEscapedTime:(ComplexNumber*)number {
    ComplexNumber *temp = [[ComplexNumber alloc] initWithReal:0.0 plural:0.0];
    
    int i = 0;
    
    for(i = 0 ; i < _maxEscapeTime ; i++)
    {
        if (temp.re * temp.re + temp.im * temp.im > 4.0) {
            return i;
        } else {
            temp = [[temp multiply:temp] add:number];
        }
    }
    
    return i;
}

-(BOOL)isInMandelbrotSet:(ComplexNumber*)number {
    return [self calcEscapedTime:number] == _maxEscapeTime;
}

-(CGRect)calcParameterRect:(CGRect)drawRect atView:(CGRect)viewRect {
    float xmin = -2.0;
    float ymin = -2.0;
    float xmax = 2.0;
    float ymax = 2.0;
    
    float scalex = (xmax - xmin) / drawRect.size.width;
    float scaley = (ymax - ymin) / drawRect.size.height;
    
    xmax = xmin + scalex * CGRectGetMaxX(viewRect);
    ymax = ymin + scaley * CGRectGetMaxY(viewRect);
    xmin = xmin + scalex * CGRectGetMinX(viewRect);
    ymin = ymin + scaley * CGRectGetMinY(viewRect);
    
    return CGRectMake(xmin, ymin, xmax - xmin, ymax - ymin);
}

- (void)generateMandelbrotImage {
    CGRect drawFrame = self.imageView.bounds;
    
    UIGraphicsBeginImageContextWithOptions(drawFrame.size, NO, 0.0);
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetRGBFillColor(context, 1.0, 1.0, 1.0, 1.0);
    CGContextFillRect(context, drawFrame);
    
    CGRect parameterRect = self.parameterRect;

    float scaleX = parameterRect.size.width / drawFrame.size.width;
    float scaleY = parameterRect.size.height / drawFrame.size.height;
    
    ComplexNumber* current = [[ComplexNumber alloc] initWithReal:0.0 plural:0.0];
    
    CGContextSetRGBFillColor(context, 0.0, 0.0, 0.0, 1.0);
    
    for (float x = drawFrame.size.width ; x > 0.0; x--) {
        for (float y = drawFrame.size.height; y > 0.0; y--) {
            
            current.re = parameterRect.origin.x + x * scaleX;
            current.im = parameterRect.origin.y + y * scaleY;
            
            int escapedTime = [self calcEscapedTime:current];
            
            if (self.colored) {
                float h = (float)escapedTime / _maxEscapeTime;
                float s = 1.0;
                float b = 1.0 - h * h;
                
                UIColor *color = [UIColor colorWithHue:h
                                            saturation:s
                                            brightness:b
                                                 alpha:1.0];
                
                //            UIColor *color = [UIColor colorWithHue:_colors[escapedTime * 3]
                //                                        saturation:_colors[escapedTime * 3 + 1]
                //                                        brightness:_colors[escapedTime * 3 + 2]
                //                                             alpha:1.0];
                CGContextSetFillColorWithColor(context, color.CGColor);
                
                CGContextFillRect(context, CGRectMake(x, y, 1, 1));
            } else {
                if (escapedTime == self.maxEscapeTime) {
                    CGContextFillRect(context, CGRectMake(x, y, 1, 1));
                }
            }
        }
    }
    
    self.imageView.image = UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
}

- (void)handleGesture:(UILongPressGestureRecognizer *)recognizer {
//    CGPoint location = [recognizer locationInView:[recognizer.view superview]];
    
    if (!self.borderView) {
        self.borderView = [[BorderView alloc] initWithFrame:CGRectMake(0, 0, 100, 100)];
        self.borderView.backgroundColor = [UIColor clearColor];
        [self.imageView addSubview:self.borderView];
    }
    
    CGPoint location = [recognizer locationInView:recognizer.view];
    
    if (location.x < 0) {
        location.x = 0;
    }
    
    if (location.y < 0) {
        location.y = 0;
    }
    
    if (location.x > recognizer.view.bounds.size.width) {
        location.x = recognizer.view.bounds.size.width;
    }
    
    if (location.y > recognizer.view.bounds.size.height) {
        location.y = recognizer.view.bounds.size.height;
    }
    
    if (recognizer.state == UIGestureRecog
        nizerStateBegan)
    {
        self.borderView.frame = CGRectMake(location.x, location.y, 0.0, 0.0);
        self.borderView.hidden = NO;
        
        self.startPoint = location;
        
        // user held down their finger on the screen
        NSLog(@"begin : %f, %f", location.x, location.y);
        // gesture started, entering the "toggle mode"
    }
    else if (recognizer.state == UIGestureRecognizerStateChanged)
    {
        [self.borderView setFrame:[self rectToPoint:location]];
        [self.borderView setNeedsDisplay];
            NSLog(@"moved : %f, %f", location.x, location.y);
        // do here whatever you wanted to do in the touchesMoved
    }
    else if (recognizer.state == UIGestureRecognizerStateEnded)
    {
        self.borderView.hidden = YES;
        
        CGRect viewRect = [self rectToPoint:location];
        
        CGFloat delta = self.parameterRect.size.width / self.imageView.bounds.size.width;
        
//        CGFloat
//        viewRect.size.width / self.imageView.bounds.size.width;
        [self generateMandelbrotImage];
        // user lifted their finger
            NSLog(@"end : %f, %f", location.x, location.y);
        
        // all done, leaving the "toggle mode"
    }
    

    //Do stuff here...
}

-(CGRect)rectToPoint:(CGPoint)endPoint {
    CGPoint origin = self.startPoint;
    
    CGSize size = CGSizeMake(fabs(endPoint.x - origin.x), fabs(endPoint.y - origin.y));
    if (endPoint.x < origin.x) {
        origin.x = endPoint.x;
    }
    
    if (endPoint.y < origin.y) {
        origin.y = endPoint.y;
    }
    
    return CGRectMake(origin.x, origin.y, size.width, size.height);
}

@end

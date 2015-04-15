//
//  ViewController.m
//  Mandelbrot
//
//  Created by betahuang on 15/4/13.
//  Copyright (c) 2015年 betahuang. All rights reserved.
//

#import "ViewController.h"
#import "ComplexNumber.h"

#define MAX_ITERATIONS 100

@interface ViewController ()
@property(nonatomic, assign) int maxEscapeTime;
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
   
    _maxEscapeTime = 50;
    
    CGSize size;
    size.width = MIN(self.view.frame.size.width, self.view.frame.size.height);
    size.height = size.width / 1.5;
    
    CGRect frame = CGRectMake((self.view.frame.size.width - size.width) / 2, (self.view.frame.size.height - size.height) / 2, size.width, size.height);
    self.imageView = [[UIImageView alloc] initWithFrame:frame];
    [self.view addSubview:self.imageView];
    
    [self generateMandelbrotImage];
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

BOOL isInMandelbrotSet(float re, float im)
{
    float x = 0 ;	float nx ;
    float y = 0 ;	float ny ;
    bool fl = TRUE ;
    for(int i = 0 ; i < MAX_ITERATIONS ; i++)
    {
        // We calculate the real part of the sequence
        nx = x*x - y*y + re ;
        // We calculate the imaginary part of the sequence
        ny = 2*x*y + im ;
        // We compute the magnitude at each step
        // We check if it's greater than 2
        if((nx*nx + ny*ny) > 4)
        {
            fl = FALSE ;
            break ;
        }
        x = nx ;
        y = ny ;
    }
    
    return fl ;
}

-(int)calcEscapedTime:(ComplexNumber*)number {
    ComplexNumber *temp = [[ComplexNumber alloc] initWithReal:0.0 plural:0.0];
    
    int i = 0;
    
    for(i = 0 ; i < _maxEscapeTime ; i++)
    {
        if ([temp magnitude] > 2.0) {
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

- (void)generateMandelbrotImage {
    CGRect drawFrame = self.imageView.bounds;
    
    UIGraphicsBeginImageContextWithOptions(drawFrame.size, NO, 0.0);
    
    CGContextRef context = UIGraphicsGetCurrentContext();
    CGContextSetRGBFillColor(context, 1.0, 1.0, 1.0, 1.0);
    CGContextFillRect(context, drawFrame);
    
    
    float scaleFactor = 2.0 / drawFrame.size.height;
    
    ComplexNumber* current = [[ComplexNumber alloc] initWithReal:0.0 plural:0.0];
    
    CGContextSetRGBFillColor(context, 0.0, 0.0, 0.0, 1.0);
    
    for (float x = drawFrame.size.width ; x > 0.0; x--) {
        for (float y = drawFrame.size.height; y > 0.0; y--) {

            current.re = x * scaleFactor - 2.0;
            current.im = y * scaleFactor - 1.0;
            
            if ([self isInMandelbrotSet:current]) {
                CGContextFillRect(context, CGRectMake(x, y, 1, 1));
            }
        }
    }
    
    self.imageView.image = UIGraphicsGetImageFromCurrentImageContext();
    
    UIGraphicsEndImageContext();
}

@end

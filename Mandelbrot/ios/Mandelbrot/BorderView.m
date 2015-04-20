//
//  BorderView.m
//  Mandelbrot
//
//  Created by betahuang on 15/4/16.
//  Copyright (c) 2015年 betahuang. All rights reserved.
//

#import "BorderView.h"

@implementation BorderView

- (void)drawRect:(CGRect)rect {
    CGContextRef context = UIGraphicsGetCurrentContext();
//    CGContextSetFillColorWithColor(context, [UIColor clearColor].CGColor);
    CGContextSetStrokeColorWithColor(context, [UIColor redColor].CGColor);
    
//    CGContextFillRect(context, rect);
    CGContextMoveToPoint(context, CGRectGetMinX(rect), CGRectGetMinY(rect));
    CGContextAddLineToPoint(context, CGRectGetMaxX(rect), CGRectGetMinY(rect));
    CGContextAddLineToPoint(context, CGRectGetMaxX(rect), CGRectGetMaxY(rect));
    CGContextAddLineToPoint(context, CGRectGetMinX(rect), CGRectGetMaxY(rect));
    CGContextAddLineToPoint(context, CGRectGetMinX(rect), CGRectGetMinY(rect));
    CGContextStrokePath(context);
//    CGContextStrokeRect(context, rect);
}


@end

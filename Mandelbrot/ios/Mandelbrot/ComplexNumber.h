//
//  ComplexNumber.h
//  Mandelbrot
//
//  Created by betahuang on 15/4/13.
//  Copyright (c) 2015年 betahuang. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface ComplexNumber : NSObject
@property(nonatomic, assign) float re; //实数
@property(nonatomic, assign) float im; //虚数
@property(nonatomic, readonly) float magnitude;

-(id)initWithReal:(float)x plural:(float)y;
-(id)initWith:(ComplexNumber*)number;
-(id)add:(ComplexNumber*)number;
-(id)multiply:(ComplexNumber*)number;
@end

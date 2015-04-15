//
//  ComplexNumber.m
//  Mandelbrot
//
//  Created by betahuang on 15/4/13.
//  Copyright (c) 2015年 betahuang. All rights reserved.
//

#import "ComplexNumber.h"

@implementation ComplexNumber
-(id)initWithReal:(float)re plural:(float)im {
    if (self = [super init]) {
        _re = re;
        _im = im;
    }
    
    return self;
}

-(id)initWith:(ComplexNumber*)number {
    return [self initWithReal:number.re plural:number.im];
}

-(float)magnitude {
    return sqrtf(_re * _re + _im * _im);
}

-(id)add:(ComplexNumber*)number {
    _re = _re + number.re;
    _im = _im + number.im;
    return self;
}

-(id)multiply:(ComplexNumber*)number {
    float tempRe = _re * number.re - _im * number.im;
    float tempIm = _re * number.im + _im * number.re;
    
    _re = tempRe;
    _im = tempIm;
    return self;
}

@end

ls_table = {
	'table':[
		{
			'name':'tree 6', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':5,
			'initial':'L',
			'angle':22,
			'rules':[
				{'source':'L', 'target':'R[-R][+L]'},
				{'source':'R', 'target':'L[+R][-R]R'},
			]
		},	
		{
			'name':'tree 5', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':4,
			'initial':'[+L-L][-L+L]',
			'angle':22,
			'rules':[
				{'source':'L', 'target':'LL[+L+L-[R-R++R]]R[-L-L+[R-R++R]]'},
				{'source':'R', 'target':'[R-R++R]'},
			]
		},	
		{
			'name':'tree 4', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':4,
			'initial':'R',
			'angle':22,
			'rules':[
				{'source':'L', 'target':'LL'},
				{'source':'R', 'target':'LR[+R][++R][+++R][-R][--R][---R]R'},
			]
		},	
		{
			'name':'tree 3', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':5,
			'initial':'F',
			'angle':20,
			'rules':[
				{'source':'F', 'target':'FF+[+F-F-F]-[-F+F+F]'}
			]
		},
		{
			'name':'tree 2', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':5,
			'initial':'F',
			'angle':25,
			'rules':[
				{'source':'F', 'target':'F[+F]F[-F]F'}
			]
		},		
		{
			'name':'tree 1', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':5,
			'initial':'F',
			'angle':25,
			'rules':[
				{'source':'F', 'target':'F[-F]F[+F]F'}
			]
		},	
		{
			'name':'Koch雪花', 
			'length':10,
			'org':{'x':0, 'y':-200},
			'steps':5,
			'initial':'F++F++F',
			'angle':60,
			'rules':[
				{'source':'F', 'target':'F--F++F--F--F'}
			]
		},		
		{
			'name':'Koch雪花', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':5,
			'initial':'F',
			'angle':25,
			'rules':[
				{'source':'F', 'target':'F[-F]F[+F]F'}
			]
		},		

		{
			'name':'Koch', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':5,
			'initial':'F',
			'angle':60,
			'rules':[
				{'source':'F', 'target':'F-F++F-F'}
			]
		},
	]
};

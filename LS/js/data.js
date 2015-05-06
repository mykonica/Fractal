ls_table = {
	'table':[
		{
			'name':'Koch雪花', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':3,
			'initial':'F',
			'angle':25,
			'rules':[
				{'source':'F', 'target':'F[-F]F[+F]F'}
			]
		},		
		{
			'name':'Koch雪花', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':3,
			'initial':'F++F++F',
			'angle':60,
			'rules':[
				{'source':'F', 'target':'F-F++F-F-F'}
			]
		},	
		{
			'name':'Koch', 
			'length':10,
			'org':{'x':0, 'y':0},
			'steps':3,
			'initial':'F',
			'angle':60,
			'rules':[
				{'source':'F', 'target':'F-F++F-F'}
			]
		},
	]
};

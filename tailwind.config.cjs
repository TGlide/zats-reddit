/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		colors: {
			white: '#FFFFFF',
			black: '#000000',
			gray: {
				0: '#F8FAFB',
				1: '#F2F4F6',
				2: '#EBEDEF',
				3: '#E0E4E5',
				4: '#D1D6D8',
				5: '#B1B6B9',
				6: '#979B9D',
				7: '#7E8282',
				8: '#666968',
				9: '#50514F',
				10: '#3A3A37',
				11: '#252521',
				12: '#121210'
			},
			red: {
				0: '#FFF5F5',
				1: '#FFE3E3',
				2: '#FFC9C9',
				3: '#FFA8A8',
				4: '#FF8787',
				5: '#FF6B6B',
				6: '#FA5252',
				7: '#F03E3E',
				8: '#E03131',
				9: '#C92A2A',
				10: '#B02525',
				11: '#962020',
				12: '#7D1A1A'
			},
			pink: {
				0: '#FFF0F6',
				1: '#FFDEEB',
				2: '#FCC2D7',
				3: '#FAA2C1',
				4: '#F783AC',
				5: '#F06595',
				6: '#E64980',
				7: '#D6336C',
				8: '#C2255C',
				9: '#A61E4D',
				10: '#8C1941',
				11: '#731536',
				12: '#59102A'
			},
			purple: {
				0: '#F8F0FC',
				1: '#F3D9FA',
				2: '#EEBEFA',
				3: '#E599F7',
				4: '#DA77F2',
				5: '#CC5DE8',
				6: '#BE4BDB',
				7: '#AE3EC9',
				8: '#9C36B5',
				9: '#862E9C',
				10: '#702682',
				11: '#5A1E69',
				12: '#44174F'
			},
			violet: {
				0: '#F3F0FF',
				1: '#E5DBFF',
				2: '#D0BFFF',
				3: '#B197FC',
				4: '#9775FA',
				5: '#845EF7',
				6: '#7950F2',
				7: '#7048E8',
				8: '#6741D9',
				9: '#5F3DC4',
				10: '#5235AB',
				11: '#462D91',
				12: '#3A2578'
			},
			indigo: {
				0: '#EDF2FF',
				1: '#DBE4FF',
				2: '#BAC8FF',
				3: '#91A7FF',
				4: '#748FFC',
				5: '#5C7CFA',
				6: '#4C6EF5',
				7: '#4263EB',
				8: '#3B5BDB',
				9: '#364FC7',
				10: '#2F44AD',
				11: '#283A94',
				12: '#21307A'
			},
			blue: {
				0: '#E7F5FF',
				1: '#D0EBFF',
				2: '#A5D8FF',
				3: '#74C0FC',
				4: '#4DABF7',
				5: '#339AF0',
				6: '#228BE6',
				7: '#1C7ED6',
				8: '#1971C2',
				9: '#1864AB',
				10: '#145591',
				11: '#114678',
				12: '#0D375E'
			},
			cyan: {
				0: '#E3FAFC',
				1: '#C5F6FA',
				2: '#99E9F2',
				3: '#66D9E8',
				4: '#3BC9DB',
				5: '#22B8CF',
				6: '#15AABF',
				7: '#1098AD',
				8: '#0C8599',
				9: '#0B7285',
				10: '#095C6B',
				11: '#074652',
				12: '#053038'
			},
			teal: {
				0: '#E6FCF5',
				1: '#C3FAE8',
				2: '#96F2D7',
				3: '#63E6BE',
				4: '#38D9A9',
				5: '#20C997',
				6: '#12B886',
				7: '#0CA678',
				8: '#099268',
				9: '#087F5B',
				10: '#066649',
				11: '#054D37',
				12: '#033325'
			},
			green: {
				0: '#EBFBEE',
				1: '#D3F9D8',
				2: '#B2F2BB',
				3: '#8CE99A',
				4: '#69DB7C',
				5: '#51CF66',
				6: '#40C057',
				7: '#37B24D',
				8: '#2F9E44',
				9: '#2B8A3E',
				10: '#237032',
				11: '#1B5727',
				12: '#133D1B'
			},
			lime: {
				0: '#F4FCE3',
				1: '#E9FAC8',
				2: '#D8F5A2',
				3: '#C0EB75',
				4: '#A9E34B',
				5: '#94D82D',
				6: '#82C91E',
				7: '#74B816',
				8: '#66A80F',
				9: '#5C940D',
				10: '#4C7A0B',
				11: '#3C6109',
				12: '#2C4706'
			},
			yellow: {
				0: '#FFF9DB',
				1: '#FFF3BF',
				2: '#FFEC99',
				3: '#FFE066',
				4: '#FFD43B',
				5: '#FCC419',
				6: '#FAB005',
				7: '#F59F00',
				8: '#F08C00',
				9: '#E67700',
				10: '#B35C00',
				11: '#804200',
				12: '#663500'
			},
			orange: {
				0: '#FFF4E6',
				1: '#FFE8CC',
				2: '#FFD8A8',
				3: '#FFC078',
				4: '#FFA94D',
				5: '#FF922B',
				6: '#FD7E14',
				7: '#F76707',
				8: '#E8590C',
				9: '#D9480F',
				10: '#BF400D',
				11: '#99330B',
				12: '#802B09'
			},
			choco: {
				0: '#FFF8DC',
				1: '#FCE1BC',
				2: '#F7CA9E',
				3: '#F1B280',
				4: '#E99B62',
				5: '#DF8545',
				6: '#D46E25',
				7: '#BD5F1B',
				8: '#A45117',
				9: '#8A4513',
				10: '#703A13',
				11: '#572F12',
				12: '#3D210D'
			},
			brown: {
				0: '#FAF4EB',
				1: '#EDE0D1',
				2: '#E0CAB7',
				3: '#D3B79E',
				4: '#C5A285',
				5: '#B78F6D',
				6: '#A87C56',
				7: '#956B47',
				8: '#825B3A',
				9: '#6F4B2D',
				10: '#5E3A21',
				11: '#4E2B15',
				12: '#422412'
			},
			sand: {
				0: '#F8FAFB',
				1: '#E6E4DC',
				2: '#D5CFBD',
				3: '#C2B9A0',
				4: '#AEA58C',
				5: '#9A9178',
				6: '#867C65',
				7: '#736A53',
				8: '#5F5746',
				9: '#4B4639',
				10: '#38352D',
				11: '#252521',
				12: '#121210'
			},
			camo: {
				0: '#F9FBE7',
				1: '#E8ED9C',
				2: '#D2DF4E',
				3: '#C2CE34',
				4: '#B5BB2E',
				5: '#A7A827',
				6: '#999621',
				7: '#8C851C',
				8: '#7E7416',
				9: '#6D6414',
				10: '#5D5411',
				11: '#4D460E',
				12: '#36300A'
			},
			jungle: {
				0: '#ECFEB0',
				1: '#DEF39A',
				2: '#D0E884',
				3: '#C2DD6E',
				4: '#B5D15B',
				5: '#A8C648',
				6: '#9BBB36',
				7: '#8FB024',
				8: '#84A513',
				9: '#7A9908',
				10: '#658006',
				11: '#516605',
				12: '#3D4D04'
			}
		},
		extend: {
			borderRadius: {
				xs: '0.125rem',
				sm: '0.25rem'
			}
		}
	},
	plugins: []
};

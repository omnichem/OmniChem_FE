import personalCare from './industryCard/images/1.png';
import medicine from './industryCard/images/2.png';
import HouseСhemicals from './industryCard/images/3.png';
import meals from './industryCard/images/5.png';
import paint from './industryCard/images/4.png';
import agriculture from './industryCard/images/6.png';
import construction from './industryCard/images/7.png';
import cars from './industryCard/images/10.png';
import print from './industryCard/images/13.png';
import industrial from './industryCard/images/8.png';
import electrical from './industryCard/images/12.png';
import goods from './industryCard/images/15.png';
import adhesives from './industryCard/images/14.png';

import basfImg from './suppliers/images/basf.jpg';
import givaudanImg from './suppliers/images/Givaudan.jpg';
import crodaImg from './suppliers/images/croda.jpg';
import seppicImg from './suppliers/images/seppic.jpg';
import cardillImg from './suppliers/images/cardill.jpg';
import ppgImg from './suppliers/images/ppg.jpg';
import sasolImg from './suppliers/images/sasol.jpg';
import sabicImg from './suppliers/images/sabic.jpg';
import nouryonImg from './suppliers/images/nouryon.jpg';
import ingredionImg from './suppliers/images/ingredion.jpg';
import admImg from './suppliers/images/ADM.jpg';
import ajinomotoImg from './suppliers/images/ajinomoto.jpg';
import evonikImg from './suppliers/images/evonik.jpg';
import pgImg from './suppliers/images/pg.jpg';
import mitsubishiImg from './suppliers/images/mitsubishi.jpg';

import laptop from './features/images/laptop.jpg';
import cart from './features/images/cart.jpg';
import checklist from './features/images/checklist.jpg';
import palette from './features/images/palette.jpg';
import fileEarmark from './features/images/fileEarmark.jpg';

import modalImg from './modalWind/modalImg.jpg';

export const industryCards = [
	{
		image: personalCare,
		title: 'Личная гигиена',
	},
	{
		image: HouseСhemicals,
		title: 'Бытовая химия',
	},
	{
		image: medicine,
		title: 'Здравоохранение и фармацевтика',
	},
	{
		image: meals,
		title: 'Еда и полноценное питание',
	},
	{
		image: paint,
		title: 'Краски и покрытия',
	},
	{
		image: agriculture,
		title: 'Сельское хозяйство и корма',
	},
	{
		image: construction,
		title: 'Здание и стройка',
	},
	{
		image: cars,
		title: 'Автомобилестроение и транспорт',
	},
	{
		image: print,
		title: 'Печать и упаковка',
	},
	{
		image: industrial,
		title: 'Промышленность',
	},
	{
		image: electrical,
		title: 'Электротехника и электроника',
	},
	{
		image: goods,
		title: 'Потребительские товары',
	},
	{
		image: adhesives,
		title: 'Клеи и герметики',
	},
];
export const suppliers = [
	{
		name: 'basf',
		img: basfImg,
	},
	{
		name: 'givaudan',
		img: givaudanImg,
	},
	{
		name: 'croda',
		img: crodaImg,
	},
	{
		name: 'seppic',
		img: seppicImg,
	},
	{
		name: 'cardill',
		img: cardillImg,
	},
	{
		name: 'ppg',
		img: ppgImg,
	},
	{
		name: 'sasol',
		img: sasolImg,
	},
	{
		name: 'sabic',
		img: sabicImg,
	},
	{
		name: 'nouryon',
		img: nouryonImg,
	},
	{
		name: 'ingredion',
		img: ingredionImg,
	},
	{
		name: 'adm',
		img: admImg,
	},
	{
		name: 'ajinomoto',
		img: ajinomotoImg,
	},
	{
		name: 'evonik',
		img: evonikImg,
	},
	{
		name: 'pg',
		img: pgImg,
	},
	{
		name: 'mitsubishi',
		img: mitsubishiImg,
	},
];

export const marketNumbers = [
	{
		figure: '≈ 7,5',
		unit: 'трлн ₽',
		description: 'объем потребления химического сырья в 2023 г.',
	},
	{
		figure: '720 625',
		description: 'компаний, занимающихся обрабатывающим производством',
	},
	{
		figure: '> 84 %',
		description: 'ежегодный прогнозируемый рост рынка до 2023 г.',
	},
	{
		figure: '> 12 %',
		unit: ' ',
		description: 'доля в ВВП Российской Федерации.',
	},
];
export const advantages = [
	{
		advantageNumber: 'first',
		advantageText:
			'Высокая заинтересованность в развитие рынка со стороны государства и различные меры поддержки.',
	},
	{
		advantageNumber: 'second',
		advantageText:
			'Низкий уровень цифровизации, что дает возможности для более быстрого развития по сравнению с конкурентами.',
	},
	{
		advantageNumber: 'third',
		advantageText:
			'Высокая доля импорта, что обеспечивает широкие возможности для развития импортозамещающих производств.',
	},
];
export const features = [
	{
		firstIcon: laptop,
		secondIcon: cart,
		featuresTitle: 'Мгновенный доступ',
		featuresDescription:
			'Узнайте какие продукты доступны на рынке за одну минуту, без длительного поиска в интернете и обзвона поставщиков.',
	},
	{
		firstIcon: checklist,
		featuresTitle: 'Изучайте документацию',
		featuresDescription:
			'Доступ к технической документации и свойствам продукта, без длительного общения по телефону или запросам по почте.',
	},
	{
		firstIcon: palette,
		secondIcon: fileEarmark,
		featuresTitle: 'Заказывайте образцы и коммерческие предложения',
		featuresDescription:
			'Быстрый заказ образцов для ваших исследований и запрос коммерческих предложений на необходимое количество сырья.',
	},
];
export const forSuppliersItems = [
	{
		itemName: 'Обзор возможностей',
	},
	{
		itemName: 'Преимущества',
	},
	{
		itemName: 'Расширенные возможности',
	},
];
export const forСustomerItems = [
	{
		itemName: 'Обзор возможностей',
	},
	{
		itemName: 'Преимущества для производителей',
	},
	{
		itemName: 'Преимущества для дистрибьюторов',
	},
];
export const aboutCompanyItems = [
	{
		itemName: 'Миссия компании',
	},
	{
		itemName: 'Наши ценности',
	},
	{
		itemName: 'Вакансии',
	},
	{
		itemName: 'Ивесторам и партнерам',
	},
];

export const modalWindData = [
	{
		modalImg: modalImg,
		modalText: 'Страница в работе',
	}
]
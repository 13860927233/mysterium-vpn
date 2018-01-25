const countries = {
  'aw': 'Aruba',
  'af': 'Afghanistan',
  'ao': 'Angola',
  'ai': 'Anguilla',
  'al': 'Albania',
  'ad': 'Andorra',
  'an': 'Netherlands Antilles',
  'ae': 'United Arab Emirates',
  'ar': 'Argentina',
  'am': 'Armenia',
  'as': 'American Samoa',
  'aq': 'Antarctica',
  'tf': 'French Southern territories',
  'ag': 'Antigua and Barbuda',
  'au': 'Australia',
  'at': 'Austria',
  'az': 'Azerbaijan',
  'bi': 'Burundi',
  'be': 'Belgium',
  'bj': 'Benin',
  'bf': 'Burkina Faso',
  'bd': 'Bangladesh',
  'bg': 'Bulgaria',
  'bh': 'Bahrain',
  'bs': 'Bahamas',
  'ba': 'Bosnia and Herzegovina',
  'by': 'Belarus',
  'bz': 'Belize',
  'bm': 'Bermuda',
  'bo': 'Bolivia',
  'br': 'Brazil',
  'bb': 'Barbados',
  'bn': 'Brunei',
  'bt': 'Bhutan',
  'bv': 'Bouvet Island',
  'bw': 'Botswana',
  'cf': 'Central African Republic',
  'ca': 'Canada',
  'cc': 'Cocos (Keeling) Islands',
  'ch': 'Switzerland',
  'cl': 'Chile',
  'cn': 'China',
  'ci': 'Ivory Coast',
  'cm': 'Cameroon',
  'cd': 'Congo, The Democratic Republic of the',
  'cg': 'Congo',
  'ck': 'Cook Islands',
  'co': 'Colombia',
  'km': 'Comoros',
  'cv': 'Cape Verde',
  'cr': 'Costa Rica',
  'cu': 'Cuba',
  'cx': 'Christmas Island',
  'ky': 'Cayman Islands',
  'cy': 'Cyprus',
  'cz': 'Czech Republic',
  'de': 'Germany',
  'dj': 'Djibouti',
  'dm': 'Dominica',
  'dk': 'Denmark',
  'do': 'Dominican Republic',
  'dz': 'Algeria',
  'ec': 'Ecuador',
  'eg': 'Egypt',
  'er': 'Eritrea',
  'eh': 'Western Sahara',
  'es': 'Spain',
  'ee': 'Estonia',
  'et': 'Ethiopia',
  'fi': 'Finland',
  'fj': 'Fiji Islands',
  'fk': 'Falkland Islands',
  'fr': 'France',
  'fo': 'Faroe Islands',
  'fm': 'Federated States of Micronesia',
  'ga': 'Gabon',
  'gb': 'United Kingdom',
  'ge': 'Georgia',
  'gh': 'Ghana',
  'gi': 'Gibraltar',
  'gn': 'Guinea',
  'gp': 'Guadeloupe',
  'gm': 'Gambia',
  'gw': 'Guinea-Bissau',
  'gq': 'Equatorial Guinea',
  'gr': 'Greece',
  'gd': 'Grenada',
  'gl': 'Greenland',
  'gt': 'Guatemala',
  'gf': 'French Guiana',
  'gu': 'Guam',
  'gy': 'Guyana',
  'hk': 'Hong Kong',
  'hm': 'Heard Island and McDonald Islands',
  'hn': 'Honduras',
  'hr': 'Croatia',
  'ht': 'Haiti',
  'hu': 'Hungary',
  'id': 'Indonesia',
  'in': 'India',
  'io': 'British Indian Ocean Territory',
  'ie': 'Ireland',
  'ir': 'Iran',
  'iq': 'Iraq',
  'is': 'Iceland',
  'il': 'Israel',
  'it': 'Italy',
  'jm': 'Jamaica',
  'jo': 'Jordan',
  'jp': 'Japan',
  'kz': 'Kazakhstan',
  'ke': 'Kenya',
  'kg': 'Kyrgyzstan',
  'kh': 'Cambodia',
  'ki': 'Kiribati',
  'kn': 'Saint Kitts and Nevis',
  'kr': 'South Korea',
  'kw': 'Kuwait',
  'la': 'Laos',
  'lb': 'Lebanon',
  'lr': 'Liberia',
  'ly': 'Libyan Arab Jamahiriya',
  'lc': 'Saint Lucia',
  'li': 'Liechtenstein',
  'lk': 'Sri Lanka',
  'ls': 'Lesotho',
  'lt': 'Lithuania',
  'lu': 'Luxembourg',
  'lv': 'Latvia',
  'mo': 'Macao',
  'ma': 'Morocco',
  'mc': 'Monaco',
  'md': 'Moldova',
  'mg': 'Madagascar',
  'mv': 'Maldives',
  'mx': 'Mexico',
  'mh': 'Marshall Islands',
  'mk': 'Macedonia',
  'ml': 'Mali',
  'mt': 'Malta',
  'mm': 'Myanmar',
  'mn': 'Mongolia',
  'mp': 'Northern Mariana Islands',
  'mz': 'Mozambique',
  'mr': 'Mauritania',
  'ms': 'Montserrat',
  'mq': 'Martinique',
  'mu': 'Mauritius',
  'mw': 'Malawi',
  'my': 'Malaysia',
  'yt': 'Mayotte',
  'na': 'Namibia',
  'nc': 'New Caledonia',
  'ne': 'Niger',
  'nf': 'Norfolk Island',
  'ng': 'Nigeria',
  'ni': 'Nicaragua',
  'nu': 'Niue',
  'nl': 'Netherlands',
  'no': 'Norway',
  'np': 'Nepal',
  'nr': 'Nauru',
  'nz': 'New Zealand',
  'om': 'Oman',
  'pk': 'Pakistan',
  'pa': 'Panama',
  'pn': 'Pitcairn',
  'pe': 'Peru',
  'ph': 'Philippines',
  'pw': 'Palau',
  'pg': 'Papua New Guinea',
  'pl': 'Poland',
  'pr': 'Puerto Rico',
  'kp': 'North Korea',
  'pt': 'Portugal',
  'py': 'Paraguay',
  'ps': 'Palestine',
  'pf': 'French Polynesia',
  'qa': 'Qatar',
  're': 'Reunion',
  'ro': 'Romania',
  'ru': 'Russian Federation',
  'rw': 'Rwanda',
  'sa': 'Saudi Arabia',
  'sd': 'Sudan',
  'sn': 'Senegal',
  'sg': 'Singapore',
  'gs': 'South Georgia and the South Sandwich Islands',
  'sh': 'Saint Helena',
  'sj': 'Svalbard and Jan Mayen',
  'sb': 'Solomon Islands',
  'sl': 'Sierra Leone',
  'sv': 'El Salvador',
  'sm': 'San Marino',
  'so': 'Somalia',
  'pm': 'Saint Pierre and Miquelon',
  'st': 'Sao Tome and Principe',
  'sr': 'Suriname',
  'sk': 'Slovakia',
  'si': 'Slovenia',
  'se': 'Sweden',
  'sz': 'Swaziland',
  'sc': 'Seychelles',
  'sy': 'Syria',
  'tc': 'Turks and Caicos Islands',
  'td': 'Chad',
  'tg': 'Togo',
  'th': 'Thailand',
  'tj': 'Tajikistan',
  'tk': 'Tokelau',
  'tm': 'Turkmenistan',
  'tp': 'East Timor',
  'to': 'Tonga',
  'tt': 'Trinidad and Tobago',
  'tn': 'Tunisia',
  'tr': 'Turkey',
  'tv': 'Tuvalu',
  'tw': 'Taiwan',
  'tz': 'Tanzania',
  'ug': 'Uganda',
  'ua': 'Ukraine',
  'um': 'United States Minor Outlying Islands',
  'uy': 'Uruguay',
  'us': 'United States',
  'uz': 'Uzbekistan',
  'va': 'Holy See (Vatican City State)',
  'vc': 'Saint Vincent and the Grenadines',
  've': 'Venezuela',
  'vg': 'British Virgin Islands',
  'vi': 'United States Virgin Islands',
  'vn': 'Vietnam',
  'vu': 'Vanuatu',
  'wf': 'Wallis and Futuna',
  'ws': 'Samoa',
  'ye': 'Yemen',
  'yu': 'Yugoslavia',
  'za': 'South Africa',
  'zm': 'Zambia',
  'zw': 'Zimbabwe'
}

function GetName (code) {
  if (typeof countries[code] !== 'undefined') {
    return countries[code]
  }

  return 'N/A'
}

export default {
  GetName
}

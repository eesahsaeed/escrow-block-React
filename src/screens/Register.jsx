
import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import waveBG from "../assets/waveBg.svg";
import InputBox from "../components/InputBox";
import PasswordInputBox from "../components/PasswordInputBox";
import SelectBox from "../components/SelectBox";
import SelectDropdown from "../components/SelectDropdown";
import PhoneInput from "../components/PhoneInput";
import {DotLoader} from "react-spinners";
import {Alert} from "react-bootstrap";
import CalculateAge from "calculate-age";
import AWS from "aws-sdk";
import {v4} from "uuid";

import {getUrl} from "../helper/url-helper";
import authHelper from "../helper/auth-helper";
import InputField from "../components/InputField";

AWS.config.update({
  accessKeyId: 'AKIAYICRR2EYF7H6S6BG',
  secretAccessKey: '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'
});

const s3 = new AWS.S3({
  params: { Bucket: "escrow-block"},
  region: "us-east-1",
});

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
}

const countries = [ 
  {name: ' -- Select Country -- ', code: ''},
  {name: 'Afghanistan', code: 'AF'}, 
  {name: 'Åland Islands', code: 'AX'}, 
  {name: 'Albania', code: 'AL'}, 
  {name: 'Algeria', code: 'DZ'}, 
  {name: 'American Samoa', code: 'AS'}, 
  {name: 'AndorrA', code: 'AD'}, 
  {name: 'Angola', code: 'AO'}, 
  {name: 'Anguilla', code: 'AI'}, 
  {name: 'Antarctica', code: 'AQ'}, 
  {name: 'Antigua and Barbuda', code: 'AG'}, 
  {name: 'Argentina', code: 'AR'}, 
  {name: 'Armenia', code: 'AM'}, 
  {name: 'Aruba', code: 'AW'}, 
  {name: 'Australia', code: 'AU'}, 
  {name: 'Austria', code: 'AT'}, 
  {name: 'Azerbaijan', code: 'AZ'}, 
  {name: 'Bahamas', code: 'BS'}, 
  {name: 'Bahrain', code: 'BH'}, 
  {name: 'Bangladesh', code: 'BD'}, 
  {name: 'Barbados', code: 'BB'}, 
  {name: 'Belarus', code: 'BY'}, 
  {name: 'Belgium', code: 'BE'}, 
  {name: 'Belize', code: 'BZ'}, 
  {name: 'Benin', code: 'BJ'}, 
  {name: 'Bermuda', code: 'BM'}, 
  {name: 'Bhutan', code: 'BT'}, 
  {name: 'Bolivia', code: 'BO'}, 
  {name: 'Bosnia and Herzegovina', code: 'BA'}, 
  {name: 'Botswana', code: 'BW'}, 
  {name: 'Bouvet Island', code: 'BV'}, 
  {name: 'Brazil', code: 'BR'}, 
  {name: 'British Indian Ocean Territory', code: 'IO'}, 
  {name: 'Brunei Darussalam', code: 'BN'}, 
  {name: 'Bulgaria', code: 'BG'}, 
  {name: 'Burkina Faso', code: 'BF'}, 
  {name: 'Burundi', code: 'BI'}, 
  {name: 'Cambodia', code: 'KH'}, 
  {name: 'Cameroon', code: 'CM'}, 
  {name: 'Canada', code: 'CA'}, 
  {name: 'Cape Verde', code: 'CV'}, 
  {name: 'Cayman Islands', code: 'KY'}, 
  {name: 'Central African Republic', code: 'CF'}, 
  {name: 'Chad', code: 'TD'}, 
  {name: 'Chile', code: 'CL'}, 
  {name: 'China', code: 'CN'}, 
  {name: 'Christmas Island', code: 'CX'}, 
  {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
  {name: 'Colombia', code: 'CO'}, 
  {name: 'Comoros', code: 'KM'}, 
  {name: 'Congo', code: 'CG'}, 
  {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
  {name: 'Cook Islands', code: 'CK'}, 
  {name: 'Costa Rica', code: 'CR'}, 
  {name: 'Cote D\'Ivoire', code: 'CI'}, 
  {name: 'Croatia', code: 'HR'}, 
  {name: 'Cuba', code: 'CU'}, 
  {name: 'Cyprus', code: 'CY'}, 
  {name: 'Czech Republic', code: 'CZ'}, 
  {name: 'Denmark', code: 'DK'}, 
  {name: 'Djibouti', code: 'DJ'}, 
  {name: 'Dominica', code: 'DM'}, 
  {name: 'Dominican Republic', code: 'DO'}, 
  {name: 'Ecuador', code: 'EC'}, 
  {name: 'Egypt', code: 'EG'}, 
  {name: 'El Salvador', code: 'SV'}, 
  {name: 'Equatorial Guinea', code: 'GQ'}, 
  {name: 'Eritrea', code: 'ER'}, 
  {name: 'Estonia', code: 'EE'}, 
  {name: 'Ethiopia', code: 'ET'}, 
  {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
  {name: 'Faroe Islands', code: 'FO'}, 
  {name: 'Fiji', code: 'FJ'}, 
  {name: 'Finland', code: 'FI'}, 
  {name: 'France', code: 'FR'}, 
  {name: 'French Guiana', code: 'GF'}, 
  {name: 'French Polynesia', code: 'PF'}, 
  {name: 'French Southern Territories', code: 'TF'}, 
  {name: 'Gabon', code: 'GA'}, 
  {name: 'Gambia', code: 'GM'}, 
  {name: 'Georgia', code: 'GE'}, 
  {name: 'Germany', code: 'DE'}, 
  {name: 'Ghana', code: 'GH'}, 
  {name: 'Gibraltar', code: 'GI'}, 
  {name: 'Greece', code: 'GR'}, 
  {name: 'Greenland', code: 'GL'}, 
  {name: 'Grenada', code: 'GD'}, 
  {name: 'Guadeloupe', code: 'GP'}, 
  {name: 'Guam', code: 'GU'}, 
  {name: 'Guatemala', code: 'GT'}, 
  {name: 'Guernsey', code: 'GG'}, 
  {name: 'Guinea', code: 'GN'}, 
  {name: 'Guinea-Bissau', code: 'GW'}, 
  {name: 'Guyana', code: 'GY'}, 
  {name: 'Haiti', code: 'HT'}, 
  {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
  {name: 'Holy See (Vatican City State)', code: 'VA'}, 
  {name: 'Honduras', code: 'HN'}, 
  {name: 'Hong Kong', code: 'HK'}, 
  {name: 'Hungary', code: 'HU'}, 
  {name: 'Iceland', code: 'IS'}, 
  {name: 'India', code: 'IN'}, 
  {name: 'Indonesia', code: 'ID'}, 
  {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
  {name: 'Iraq', code: 'IQ'}, 
  {name: 'Ireland', code: 'IE'}, 
  {name: 'Isle of Man', code: 'IM'}, 
  {name: 'Israel', code: 'IL'}, 
  {name: 'Italy', code: 'IT'}, 
  {name: 'Jamaica', code: 'JM'}, 
  {name: 'Japan', code: 'JP'}, 
  {name: 'Jersey', code: 'JE'}, 
  {name: 'Jordan', code: 'JO'}, 
  {name: 'Kazakhstan', code: 'KZ'}, 
  {name: 'Kenya', code: 'KE'}, 
  {name: 'Kiribati', code: 'KI'}, 
  {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
  {name: 'Korea, Republic of', code: 'KR'}, 
  {name: 'Kuwait', code: 'KW'}, 
  {name: 'Kyrgyzstan', code: 'KG'}, 
  {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
  {name: 'Latvia', code: 'LV'}, 
  {name: 'Lebanon', code: 'LB'}, 
  {name: 'Lesotho', code: 'LS'}, 
  {name: 'Liberia', code: 'LR'}, 
  {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
  {name: 'Liechtenstein', code: 'LI'}, 
  {name: 'Lithuania', code: 'LT'}, 
  {name: 'Luxembourg', code: 'LU'}, 
  {name: 'Macao', code: 'MO'}, 
  {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
  {name: 'Madagascar', code: 'MG'}, 
  {name: 'Malawi', code: 'MW'}, 
  {name: 'Malaysia', code: 'MY'}, 
  {name: 'Maldives', code: 'MV'}, 
  {name: 'Mali', code: 'ML'}, 
  {name: 'Malta', code: 'MT'}, 
  {name: 'Marshall Islands', code: 'MH'}, 
  {name: 'Martinique', code: 'MQ'}, 
  {name: 'Mauritania', code: 'MR'}, 
  {name: 'Mauritius', code: 'MU'}, 
  {name: 'Mayotte', code: 'YT'}, 
  {name: 'Mexico', code: 'MX'}, 
  {name: 'Micronesia, Federated States of', code: 'FM'}, 
  {name: 'Moldova, Republic of', code: 'MD'}, 
  {name: 'Monaco', code: 'MC'}, 
  {name: 'Mongolia', code: 'MN'}, 
  {name: 'Montserrat', code: 'MS'}, 
  {name: 'Morocco', code: 'MA'}, 
  {name: 'Mozambique', code: 'MZ'}, 
  {name: 'Myanmar', code: 'MM'}, 
  {name: 'Namibia', code: 'NA'}, 
  {name: 'Nauru', code: 'NR'}, 
  {name: 'Nepal', code: 'NP'}, 
  {name: 'Netherlands', code: 'NL'}, 
  {name: 'Netherlands Antilles', code: 'AN'}, 
  {name: 'New Caledonia', code: 'NC'}, 
  {name: 'New Zealand', code: 'NZ'}, 
  {name: 'Nicaragua', code: 'NI'}, 
  {name: 'Niger', code: 'NE'}, 
  {name: 'Nigeria', code: 'NG'}, 
  {name: 'Niue', code: 'NU'}, 
  {name: 'Norfolk Island', code: 'NF'}, 
  {name: 'Northern Mariana Islands', code: 'MP'}, 
  {name: 'Norway', code: 'NO'}, 
  {name: 'Oman', code: 'OM'}, 
  {name: 'Pakistan', code: 'PK'}, 
  {name: 'Palau', code: 'PW'}, 
  {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
  {name: 'Panama', code: 'PA'}, 
  {name: 'Papua New Guinea', code: 'PG'}, 
  {name: 'Paraguay', code: 'PY'}, 
  {name: 'Peru', code: 'PE'}, 
  {name: 'Philippines', code: 'PH'}, 
  {name: 'Pitcairn', code: 'PN'}, 
  {name: 'Poland', code: 'PL'}, 
  {name: 'Portugal', code: 'PT'}, 
  {name: 'Puerto Rico', code: 'PR'}, 
  {name: 'Qatar', code: 'QA'}, 
  {name: 'Reunion', code: 'RE'}, 
  {name: 'Romania', code: 'RO'}, 
  {name: 'Russian Federation', code: 'RU'}, 
  {name: 'RWANDA', code: 'RW'}, 
  {name: 'Saint Helena', code: 'SH'}, 
  {name: 'Saint Kitts and Nevis', code: 'KN'}, 
  {name: 'Saint Lucia', code: 'LC'}, 
  {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
  {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
  {name: 'Samoa', code: 'WS'}, 
  {name: 'San Marino', code: 'SM'}, 
  {name: 'Sao Tome and Principe', code: 'ST'}, 
  {name: 'Saudi Arabia', code: 'SA'}, 
  {name: 'Senegal', code: 'SN'}, 
  {name: 'Serbia and Montenegro', code: 'CS'}, 
  {name: 'Seychelles', code: 'SC'}, 
  {name: 'Sierra Leone', code: 'SL'}, 
  {name: 'Singapore', code: 'SG'}, 
  {name: 'Slovakia', code: 'SK'}, 
  {name: 'Slovenia', code: 'SI'}, 
  {name: 'Solomon Islands', code: 'SB'}, 
  {name: 'Somalia', code: 'SO'}, 
  {name: 'South Africa', code: 'ZA'}, 
  {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
  {name: 'Spain', code: 'ES'}, 
  {name: 'Sri Lanka', code: 'LK'}, 
  {name: 'Sudan', code: 'SD'}, 
  {name: 'Suriname', code: 'SR'}, 
  {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
  {name: 'Swaziland', code: 'SZ'}, 
  {name: 'Sweden', code: 'SE'}, 
  {name: 'Switzerland', code: 'CH'}, 
  {name: 'Syrian Arab Republic', code: 'SY'}, 
  {name: 'Taiwan, Province of China', code: 'TW'}, 
  {name: 'Tajikistan', code: 'TJ'}, 
  {name: 'Tanzania, United Republic of', code: 'TZ'}, 
  {name: 'Thailand', code: 'TH'}, 
  {name: 'Timor-Leste', code: 'TL'}, 
  {name: 'Togo', code: 'TG'}, 
  {name: 'Tokelau', code: 'TK'}, 
  {name: 'Tonga', code: 'TO'}, 
  {name: 'Trinidad and Tobago', code: 'TT'}, 
  {name: 'Tunisia', code: 'TN'}, 
  {name: 'Turkey', code: 'TR'}, 
  {name: 'Turkmenistan', code: 'TM'}, 
  {name: 'Turks and Caicos Islands', code: 'TC'}, 
  {name: 'Tuvalu', code: 'TV'}, 
  {name: 'Uganda', code: 'UG'}, 
  {name: 'Ukraine', code: 'UA'}, 
  {name: 'United Arab Emirates', code: 'AE'}, 
  {name: 'United Kingdom', code: 'GB'}, 
  {name: 'United States', code: 'US'}, 
  {name: 'United States Minor Outlying Islands', code: 'UM'}, 
  {name: 'Uruguay', code: 'UY'}, 
  {name: 'Uzbekistan', code: 'UZ'}, 
  {name: 'Vanuatu', code: 'VU'}, 
  {name: 'Venezuela', code: 'VE'}, 
  {name: 'Viet Nam', code: 'VN'}, 
  {name: 'Virgin Islands, British', code: 'VG'}, 
  {name: 'Virgin Islands, U.S.', code: 'VI'}, 
  {name: 'Wallis and Futuna', code: 'WF'}, 
  {name: 'Western Sahara', code: 'EH'}, 
  {name: 'Yemen', code: 'YE'}, 
  {name: 'Zambia', code: 'ZM'}, 
  {name: 'Zimbabwe', code: 'ZW'} 
]

if (!authHelper.isFirstDone()){
  authHelper.resetForm();
}

export default function RegisterIndividual() {
  const [form, setForm] = useState(authHelper.isFirstDone() ? "second" : "first");
  const [values, setValues] = useState(authHelper.getForm());
  const [secondTabDisabled, setSecondTabDisabled] = useState(!authHelper.isFirstDone());

  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#f5ca4e");
  
  const navigate = useNavigate();

  function handleSubmit(e){
    e.preventDefault();
    console.log(values);
  }

  return (
    <>
      <div>
        <div className="sign_up_container">
          <div className="about_section__content__card sign_up_form">
            {loading && <div className="loading-container">
              <DotLoader
                color={color}
                loading={loading}
                cssOverride={override}
                size={150}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </div>}
            <div className="signup__container__new__form__heading">
              <div>Sign Up Now</div>
              <div className="sign_up_tab_container">
                <button 
                  className="sign_up_tab_button" 
                  onClick={() => setForm("first")}
                >
                  {form === "first" ? <div>
                    <div>
                      <svg width="22" height="22" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.625 61.25C13.7108 61.25 0 47.5392 0 30.625C0 13.7108 13.7108 0 30.625 0C47.5392 0 61.25 13.7108 61.25 30.625C61.25 47.5392 47.5392 61.25 30.625 61.25ZM30.625 55.125C37.1228 55.125 43.3545 52.5438 47.9491 47.9491C52.5438 43.3545 55.125 37.1228 55.125 30.625C55.125 24.1272 52.5438 17.8955 47.9491 13.3009C43.3545 8.70624 37.1228 6.125 30.625 6.125C24.1272 6.125 17.8955 8.70624 13.3009 13.3009C8.70624 17.8955 6.125 24.1272 6.125 30.625C6.125 37.1228 8.70624 43.3545 13.3009 47.9491C17.8955 52.5438 24.1272 55.125 30.625 55.125V55.125ZM30.625 45.9375C26.5639 45.9375 22.6691 44.3242 19.7974 41.4526C16.9258 38.5809 15.3125 34.6861 15.3125 30.625C15.3125 26.5639 16.9258 22.6691 19.7974 19.7974C22.6691 16.9258 26.5639 15.3125 30.625 15.3125C34.6861 15.3125 38.5809 16.9258 41.4526 19.7974C44.3242 22.6691 45.9375 26.5639 45.9375 30.625C45.9375 34.6861 44.3242 38.5809 41.4526 41.4526C38.5809 44.3242 34.6861 45.9375 30.625 45.9375V45.9375Z" fill="#FFBC00"></path>
                      </svg>
                    </div>
                    <div className="sign_up_tab_info tab_active">Primary Info</div>
                    <div className="sign_up_line sign_up_line_active">

                    </div>
                  </div> : <div>
                    <div>
                      <svg width="22" height="22" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.25 6.125C20.345 6.125 6.625 19.845 6.625 36.75C6.625 53.655 20.345 67.375 37.25 67.375C54.155 67.375 67.875 53.655 67.875 36.75C67.875 19.845 54.155 6.125 37.25 6.125ZM37.25 61.25C23.7137 61.25 12.75 50.2863 12.75 36.75C12.75 23.2137 23.7137 12.25 37.25 12.25C50.7863 12.25 61.75 23.2137 61.75 36.75C61.75 50.2863 50.7863 61.25 37.25 61.25Z" fill="gray"></path>
                      </svg>
                    </div>
                    <div className="sign_up_tab_info">
                      Primary Info
                    </div>
                    <div className="sign_up_line">

                    </div>  
                  </div>}
                </button>
                <button 
                  className="sign_up_tab_button" 
                  onClick={() => setForm("second")}
                  disabled={secondTabDisabled}
                >
                  {form === "second" ? <div>
                    <div>
                      <svg width="22" height="22" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.625 61.25C13.7108 61.25 0 47.5392 0 30.625C0 13.7108 13.7108 0 30.625 0C47.5392 0 61.25 13.7108 61.25 30.625C61.25 47.5392 47.5392 61.25 30.625 61.25ZM30.625 55.125C37.1228 55.125 43.3545 52.5438 47.9491 47.9491C52.5438 43.3545 55.125 37.1228 55.125 30.625C55.125 24.1272 52.5438 17.8955 47.9491 13.3009C43.3545 8.70624 37.1228 6.125 30.625 6.125C24.1272 6.125 17.8955 8.70624 13.3009 13.3009C8.70624 17.8955 6.125 24.1272 6.125 30.625C6.125 37.1228 8.70624 43.3545 13.3009 47.9491C17.8955 52.5438 24.1272 55.125 30.625 55.125V55.125ZM30.625 45.9375C26.5639 45.9375 22.6691 44.3242 19.7974 41.4526C16.9258 38.5809 15.3125 34.6861 15.3125 30.625C15.3125 26.5639 16.9258 22.6691 19.7974 19.7974C22.6691 16.9258 26.5639 15.3125 30.625 15.3125C34.6861 15.3125 38.5809 16.9258 41.4526 19.7974C44.3242 22.6691 45.9375 26.5639 45.9375 30.625C45.9375 34.6861 44.3242 38.5809 41.4526 41.4526C38.5809 44.3242 34.6861 45.9375 30.625 45.9375V45.9375Z" fill="#FFBC00"></path>
                      </svg>
                    </div>
                    <div className="sign_up_tab_info tab_active">Secondary Info</div>
                    <div className="sign_up_line sign_up_line_active">

                    </div>
                  </div> : <div>
                    <div>
                      <svg width="22" height="22" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.25 6.125C20.345 6.125 6.625 19.845 6.625 36.75C6.625 53.655 20.345 67.375 37.25 67.375C54.155 67.375 67.875 53.655 67.875 36.75C67.875 19.845 54.155 6.125 37.25 6.125ZM37.25 61.25C23.7137 61.25 12.75 50.2863 12.75 36.75C12.75 23.2137 23.7137 12.25 37.25 12.25C50.7863 12.25 61.75 23.2137 61.75 36.75C61.75 50.2863 50.7863 61.25 37.25 61.25Z" fill="gray"></path>
                      </svg>
                    </div>
                    <div className="sign_up_tab_info">
                      Secondary Info
                    </div>
                    <div className="sign_up_line">

                    </div>  
                  </div>}
                </button>
              </div>
              <div className="sign_up_main_content">
                <div style={{marginBottom: 10}}>
                  Please enter name as displayed on official documents
                </div>
                {form === "first" ? <Form1 
                  values={values} 
                  setValues={setValues}
                  handleSubmit={handleSubmit}
                  setForm={setForm}
                  setLoading={setLoading}
                  /> : <Form2
                  values={values}
                  setValues={setValues}
                  handleSubmit={handleSubmit}
                  setForm={setForm}
                  setLoading={setLoading}
                  />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Form1({values, setValues, setForm, setLoading}){
  const navigate = useNavigate();

  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [firstNameError, setFirstNameError] = useState(false);
  const [firstNameErrorMessage, setFirstNameErrorMessage] = useState("");
  const [lastNameError, setLastNameError] = useState(false);
  const [lastNameErrorMessage, setLastNameErrorMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [genderError, setGenderError] = useState(false);
  const [genderErrorMessage, setGenderErrorMessage] = useState("");
  const [countryError, setCountryError] = useState(false);
  const [countryErrorMessage, setCountryErrorMessage] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");
  const [dateOfBirthError, setDateOfBirthError] = useState(false);
  const [dateOfBirthErrorMessage, setDateOfBirthErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("");

  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: ""
  });

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setErrorMessage({
      error: false,
      message: ""
    });

    clearError(name);
    authHelper.updateForm(name, value)
    
    setValues({...values, [name]: value});
  };

  function clearError(name){
    if (name === "userName"){
      setUserNameError(false);
      setUserNameErrorMessage("");
    }

    if (name === "firstName"){
      setFirstNameError(false);
      setFirstNameErrorMessage("");
    }

    if (name === "lastName"){
      setLastNameError(false);
      setLastNameErrorMessage("");
    }

    if (name === "email"){
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (name === "gender"){
      setGenderError(false);
      setGenderErrorMessage("");
    }

    if (name === "country"){
      setCountryError(false);
      setCountryErrorMessage("");
    }

    if (name === "phoneNumber"){
      setPhoneNumberError(false);
      setPhoneNumberErrorMessage("");
    }

    if (name === "dateOfBirth"){
      setDateOfBirthError(false);
      setDateOfBirthErrorMessage("");
    }

    if (name === "password"){
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (name === "password" || name === "confirmPassword"){
      setPasswordError(false);
      setPasswordErrorMessage("");
      setConfirmPasswordError(false);
      setConfirmPasswordErrorMessage("");
    }
  }

  function validateFirstForm(){
    let valid = true;
    let age = new CalculateAge(values.dateOfBirth, new Date()).getObject();

    if (!values.userName){
      valid = false;
      setUserNameError(true);
      setUserNameErrorMessage("User Name is required");
    }

    if (!values.firstName){
      valid = false;
      setFirstNameError(true);
      setFirstNameErrorMessage("First Name is required");
    }

    if (!values.lastName){
      valid = false;
      setLastNameError(true);
      setLastNameErrorMessage("Last Name is required");
    }

    if (!values.email){
      valid = false;
      setEmailError(true);
      setEmailErrorMessage("Email Address is required");
    }

    if (!values.gender){
      valid = false;
      setGenderError(true);
      setGenderErrorMessage("Gender is required");
    }

    if (!values.country){
      valid = false;
      setCountryError(true);
      setCountryErrorMessage("Select a country");
    }

    if (!values.phoneNumber){
      valid = false;
      setPhoneNumberError(true);
      setPhoneNumberErrorMessage("Phone Number is required");
    }

    if (age.years < 18){
      valid = false;
      setDateOfBirthError(true);
      setDateOfBirthErrorMessage("You must be at least 18 years old to register");
    }

    if (!values.password){
      valid = false;
      setPasswordError(true);
      setPasswordErrorMessage("Invalid Password");
    } else if (values.password.length < 8){
      valid = false;
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long");
    }

    if (values.password !== values.confirmPassword){
      valid = false;
      setPasswordError(true);
      setPasswordErrorMessage("Passwords do not match");
      setConfirmPasswordError(true);
      setConfirmPasswordErrorMessage("Passwords do not match");
    }

    if (!valid){
      setErrorMessage({
        error: true,
        message: "Validation Error"
      })
    }

    return valid;
  }

  async function SignUp1(event) {
    event.preventDefault();

    let valid = validateFirstForm();
    console.log(values)

    if (valid){
      setLoading(true);

      const abortController = new AbortController();
      const signal = abortController.signal;

      async function register(){
        try{
        let response = await fetch(`${getUrl()}/users/register`, {
            method: "POST",
            headers: {
              "Accept": "application/json"
            },
            body: JSON.stringify(values)
          })

          return await response.json();
        } catch(err){
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }

      register().then(data => {
        console.log(data);

        if (data.success){
          setLoading(false);
          setForm("second");
          authHelper.setForm(data.data);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (data.errors){
          let errors = Object.keys(data.errors);

          for (let i = 0; i < errors.length; i++){
            let name = errors[i];

            if (name === "userName"){
              setUserNameError(true);
              setUserNameErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "firstName"){
              setFirstNameError(true);
              setFirstNameErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "lastName"){
              setLastNameError(true);
              setLastNameErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "email"){
              setEmailError(true);
              setEmailErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "gender"){
              setGenderError(true);
              setGenderErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "country"){
              setCountryError(true);
              setCountryErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "phoneNumber"){
              setPhoneNumberError(true);
              setPhoneNumberErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "dateOfBirth"){
              setDateOfBirthError(true);
              setDateOfBirthErrorMessage(data.errors[errors[i]].message)
            }
        
            if (name === "password"){
              setPasswordError(true);
              setPasswordErrorMessage(data.errors[errors[i]].message);
            }

            if (name === "confirmPassword"){
              setConfirmPasswordError(true);
              setConfirmPasswordErrorMessage(data.errors[errors[i]].message);
            }
          }

          setErrorMessage({
            error: true,
            message: data["_message"]
          });
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (data.message){
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          console.log(data);
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }).catch(err => {
        console.log(err);
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  async function update1(event) {
    event.preventDefault();
    console.log(values);

    let valid = validateFirstForm();

    if (valid){
      setLoading(true);

      const abortController = new AbortController();
      const signal = abortController.signal;

      async function updateUser(){
        try{
        let response = await fetch(`${getUrl()}/users/update-user`, {
            method: "POST",
            headers: {
              "Accept": "application/json"
            },
            body: JSON.stringify(authHelper.getForm())
          })

          return await response.json();
        } catch(err){
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }

      updateUser().then(data => {
        console.log(data);

        if (data.success){
          console.log(data.data);
          setLoading(false);
          setForm("second");
          authHelper.setForm(data.data);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (data.errors){
          let errors = Object.keys(data.errors);

          for (let i = 0; i < errors.length; i++){
            let name = errors[i];

            if (name === "userName"){
              setUserNameError(true);
              setUserNameErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "firstName"){
              setFirstNameError(true);
              setFirstNameErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "lastName"){
              setLastNameError(true);
              setLastNameErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "email"){
              setEmailError(true);
              setEmailErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "gender"){
              setGenderError(true);
              setGenderErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "country"){
              setCountryError(true);
              setCountryErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "phoneNumber"){
              setPhoneNumberError(true);
              setPhoneNumberErrorMessage(data.errors[errors[i]].message);
            }
        
            if (name === "dateOfBirth"){
              setDateOfBirthError(true);
              setDateOfBirthErrorMessage(data.errors[errors[i]].message)
            }
        
            if (name === "password"){
              setPasswordError(true);
              setPasswordErrorMessage(data.errors[errors[i]].message);
            }

            if (name === "confirmPassword"){
              setConfirmPasswordError(true);
              setConfirmPasswordErrorMessage(data.errors[errors[i]].message);
            }
          }
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (data.message){
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else {
          console.log(data);
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }).catch(err => {
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return (
    <form style={{position: "relative"}}>
      {errorMessage.error && <Alert variant={"danger"} className="text-center">
        <span style={{
          fontWeight: "bold"
        }}>{errorMessage.message}</span>
      </Alert>}
      <div className="input_container">
        <InputField 
          name="userName" 
          type="text" 
          onChange={onChangeHandler} 
          label="User Name" 
          placeholder="User Name"
          error={userNameError}
          errorMessage={userNameErrorMessage}
          defaultValue={values.userName}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="firstName" 
          type="text" 
          onChange={onChangeHandler} 
          label="First Name" 
          placeholder="First Name"
          error={firstNameError}
          errorMessage={firstNameErrorMessage}
          defaultValue={values.firstName}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="lastName" 
          type="text" 
          onChange={onChangeHandler} 
          label="Last Name" 
          placeholder="Last Name"
          error={lastNameError}
          errorMessage={lastNameErrorMessage}
          defaultValue={values.lastName}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="middleName" 
          type="text" 
          onChange={onChangeHandler} 
          label="Middle Name (Optional)" 
          placeholder="Middle Name (Optional)"
          error={false}
          errorMessage={""}
          defaultValue={values.middleName}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="email" 
          type="email" 
          onChange={onChangeHandler} 
          label="Email Address" 
          placeholder="Email"
          error={emailError}
          errorMessage={emailErrorMessage}
          defaultValue={values.email}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="gender"
          type="select"
          onChange={onChangeHandler}
          label="Gender"
          placeholder="Gender"
          error={genderError}
          errorMessage={genderErrorMessage}
          defaultValue={values.gender}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </InputField>
      </div>
      <div className="input_container">
        <InputField 
          name="country"
          type="select"
          onChange={onChangeHandler}
          label="Country"
          placeholder="Gender"
          error={countryError}
          errorMessage={countryErrorMessage}
          defaultValue={values.country}
        >
          {countries.map((c, i) => (
            <option value={c.name}>{c.name}</option>
          ))}
        </InputField>
      </div>
      <div className="input_container">
        <InputField 
          name="phoneNumber"
          type="text" 
          onChange={onChangeHandler} 
          label="Phone Number"
          error={phoneNumberError}
          errorMessage={phoneNumberErrorMessage}
          value={values.phoneNumber}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="dateOfBirth"
          type="date" 
          onChange={onChangeHandler} 
          label="Date Of Birth"
          value={new Date(values.dateOfBirth)}
          error={dateOfBirthError}
          errorMessage={dateOfBirthErrorMessage}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="password"
          type="password" 
          onChange={onChangeHandler} 
          label="Password"
          placeholder="Password"
          error={passwordError}
          errorMessage={passwordErrorMessage}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="confirmPassword"
          type="password" 
          onChange={onChangeHandler} 
          label="Confirm Password"
          placeholder="Confirm Password"
          error={confirmPasswordError}
          errorMessage={confirmPasswordErrorMessage}
        />
      </div>
      {!authHelper.isFirstDone() && <>
        <div className="check2">
        <InputField 
          name="checkbox1"
          type="checkbox" 
          onChange={onChangeHandler} 
          label="I'm over the 18 age and accept terms and conditions"
        />
      </div>
      <div className="check2">
        <InputField 
          name="checkbox2"
          type="checkbox" 
          onChange={onChangeHandler} 
          label="I would like to receive newsletter via Email"
        />
      </div>
      <div className="input_container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        Already a user?<pre>{" "}</pre><Link to="/login" className="login-link">Click here to Login</Link>
        {authHelper.isFirstDone() ? <button 
          className="button gap" 
          onClick={update1}
        >Update</button> : <button 
        className="button gap" 
        onClick={SignUp1}
      >Register Now</button>}
      </div>
      </> }
    </form>
  )
}

function Form2({values, setValues, setForm, setLoading}){
  const navigate = useNavigate();

  const [preferredCommuninicationError, setPreferredCommunicationError] = useState(false);
  const [preferredCommuninicationErrorMessage, setPreferredCommunicationErrorMessage] = useState("");
  const [telegramError, setTelegramError] = useState(false);
  const [telegramErrorMessage, setTelegramErrorMessage] = useState("")
  const [whatsAppError, setWhatsAppError] = useState(false);
  const [whatsAppErrorMessage, setWhatsAppErrorMessage] = useState("")
  const [addressError, setAddressError] = useState(false);
  const [addressErrorMessage, setAddressErrorMessage] = useState("");
  const [employmentStatusError, setEmploymentStatusError] = useState(false);
  const [employmentStatusErrorMessage, setEmploymentStatusErrorMessage] = useState("");
  const [occupationError, setOccupationError] = useState(false);
  const [occupationErrorMessage, setOccupationErrorMessage] = useState("");
  const [purposeOfEscrowAccountError, setPurposeOfEscrowAccountError] = useState(false);
  const [purposeOfEscrowAccountErrorMessage, setPurposeOfEscrowAccountErrorMessage] = useState("");
  const [sourceOfFundsError, setSourceOfFundsError] = useState(false);
  const [sourceOfFundsErrorMessage, setSourceOfFundsErrorMessage] = useState("");
  const [expectedTransactionSizePerTradeError, setExpectedTransactionSizePerTradeError] = useState(false);
  const [expectedTransactionSizePerTradeErrorMessage, setExpectedTransactionSizePerTradeErrorMessage] = useState("");
  const [identificationError, setIdentificationError] = useState(false);
  const [identificationErrorMessage, setIdentificationErrorMessage] = useState("");
  const [proofOfAddressError, setProofOfAddressError] = useState(false);
  const [proofOfAddressErrorMessage, setProofOfAddressErrorMessage] = useState("");
  const [socialSecurityNumberError, setSocialSecurityNumberError] = useState(false);
  const [socialSecurityNumberErrorMessage, setSocialSecurityNumberErrorMessage] = useState("");
  const [bankStatementError, setBankStatementError] = useState(false);
  const [bankStatementErrorMessage, setBankStatementErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: ""
  })

  const onChangeHandler = (e) => {
    let name = e.target.name;
    let value = null;

    clearError(name);
    
    switch(name){
      case "identification":
        value = e.target.files[0]
        break;

      case "proofOfAddress":
        value = e.target.files[0];
        break;

      case "bankStatement":
        value = e.target.files[0];
        break;

      default:
        value = e.target.value;
        break;
    }

    authHelper.updateForm(name, value)

    setValues({...values, [name]: value});
  };

  function clearError(name){
    if (name === "preferredCommunication"){
      setPreferredCommunicationError(false);
      setPreferredCommunicationErrorMessage("");
    }

    if (name === "telegram"){
      setTelegramError(false);
      setTelegramErrorMessage("");
    }

    if (name === "whatsApp"){
      setWhatsAppError(false);
      setWhatsAppErrorMessage("");
    }

    if (name === "employmentStatus"){
      setEmploymentStatusError(false);
      setEmploymentStatusErrorMessage("");
    }

    if (name === "occupation"){
      setOccupationError(false);
      setOccupationErrorMessage("");
    }

    if (name === "purposeOfEscrowAccount"){
      setPurposeOfEscrowAccountError(false);
      setPurposeOfEscrowAccountErrorMessage("");
    }

    if (name === "sourceOfFunds"){
      setSourceOfFundsError(false);
      setSourceOfFundsErrorMessage("");
    }

    if (name === "expectedTransactionSizePerTrade"){
      setExpectedTransactionSizePerTradeError(false);
      setExpectedTransactionSizePerTradeErrorMessage("");
    }

    if (name === "address"){
      setAddressError(false);
      setAddressErrorMessage("");
    }

    if (name === "identification"){
      setIdentificationError(false);
      setIdentificationErrorMessage("");
    }

    if (name === "proofOfAddress"){
      setProofOfAddressError(false);
      setProofOfAddressErrorMessage("");
    }

    if (name === "bankStatement"){
      setBankStatementError(false);
      setBankStatementErrorMessage("");
    }

    if (name === "socialSecurityNumber"){
      setSocialSecurityNumberError(false);
      setSocialSecurityNumberErrorMessage("");
    }
  }

  function validateSecondForm(){
    let valid = true;

    if (!values.preferredCommunication){
      valid = false;
      setPreferredCommunicationError(true);
      setPreferredCommunicationErrorMessage("Preferred Communication is required");
    }

    if (!values.telegram && values.preferredCommunication === "Telegram"){
      valid = false;
      setTelegramError(true);
      setTelegramErrorMessage("Telegram is required");
    }

    if (!values.whatsApp && values.preferredCommunication === "WhatsApp"){
      valid = false;
      setWhatsAppError(true);
      setWhatsAppErrorMessage("WhatsApp is required");
    }

    if (!values.employmentStatus){
      valid = false;
      setEmploymentStatusError(true);
      setEmploymentStatusErrorMessage("Employment Status is required")
    }

    if (!values.occupation){
      valid = false;
      setOccupationError(true);
      setOccupationErrorMessage("Occupation is required");
    }

    if (!values.purposeOfEscrowAccount){
      valid = false;
      setPurposeOfEscrowAccountError(true);
      setPurposeOfEscrowAccountErrorMessage("Purpose of Escrow Account is required");
    }

    if (!values.sourceOfFunds){
      valid = false;
      setSourceOfFundsError(true);
      setSourceOfFundsErrorMessage("Source Of Funds is required");
    }

    if (!values.expectedTransactionSizePerTrade){
      valid = false;
      setExpectedTransactionSizePerTradeError(true);
      setExpectedTransactionSizePerTradeErrorMessage("Expected Transaction Size Per Trade is required");
    }

    if (!values.address){
      valid = false;
      setAddressError(true);
      setAddressErrorMessage("Address is required");
    }

    if (!values.identification){
      valid = false;
      setIdentificationError(true);
      setIdentificationErrorMessage("Identification is required");
    }

    if (!values.proofOfAddress){
      valid = false;
      setProofOfAddressError(true);
      setProofOfAddressErrorMessage("Proof Of Address is required");
    }

    if (!values.bankStatement){
      valid = false;
      setBankStatementError(true);
      setBankStatementErrorMessage("Bank Statement is required");
    }

    if (!values.socialSecurityNumber){
      valid = false;
      setSocialSecurityNumberError(true);
      setSocialSecurityNumberErrorMessage("Social Security Number is required");
    }

    return valid;
  }

  async function uploadFiles(){
    const arr = ["identification", "proofOfAddress", "bankStatement"]; 
    let obj = {identification: {}, proofOfAddress: {}, bankStatement: {}};

    for (let i = 0; i < arr.length; i++){
      const params = {
        ACL: 'public-read',
        Body: values[arr[i]],
        Bucket: "escrow-block",
        Key: `${v4()}-${values[arr[i]].name}`
      };

      const uploadedImage = await s3.upload(params).promise()
      obj[arr[i]] = {
        url: uploadedImage.Location,
        contentType: values[arr[i]].type,
        key: uploadedImage.Key
      }
    }

    return obj;
  }

  async function SignUp2(event){
    event.preventDefault();

    let valid = validateSecondForm();

    if (valid){
      setLoading(true);

      let obj = await uploadFiles();

      const abortController = new AbortController();
      const signal = abortController.signal;

      async function register(){
        try{
        let response = await fetch(`${getUrl()}/users/update-user`, {
            method: "POST",
            headers: {
              "Accept": "application/json"
            },
            body: JSON.stringify({
              ...values,
              ...obj,
              id: authHelper.getForm().id,
            })
          })

          return await response.json();
        } catch(err){
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }

      register().then(data => {
        console.log(data);

        if (data.success){
          setLoading(false);
          authHelper.clearForm();
          navigate(`/welcome/${data.data.firstName}`);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (data.errors){
          setErrorMessage({
            error: true,
            message: data["_message"]
          });
          console.log(data);
          setLoading(false);
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }
      }).catch(err => {
        console.log(err);
        setLoading(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      })
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }

  return (
    <form>
      {errorMessage.error && <Alert variant={"danger"} className="text-center">
        <span style={{
          fontWeight: "bold"
        }}>{errorMessage.message}</span>
      </Alert>}
      <div className="input_container">
        <InputField 
          name="preferredCommunication" 
          type="select" 
          onChange={onChangeHandler} 
          label="Preferred Communication" 
          placeholder="Preferred Communication"
          error={preferredCommuninicationError}
          errorMessage={preferredCommuninicationErrorMessage}
          defaultValue={values.preferredCommunication}
        >
          <option value="Telegram">Telegram</option>
        </InputField>
      </div>
      <div className="input_container">
        <InputField 
          name="telegram" 
          type="text" 
          onChange={onChangeHandler} 
          label="Telegram User Name or ID" 
          placeholder="Telegram"
          error={telegramError}
          errorMessage={telegramErrorMessage}
          defaultValue={values.telegram}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="address" 
          type="text" 
          onChange={onChangeHandler} 
          label="Address" 
          placeholder="Address"
          error={addressError}
          errorMessage={addressErrorMessage}
          defaultValue={values.address}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="employmentStatus"
          type="select"
          onChange={onChangeHandler}
          label="Employment Status"
          placeholder="Employment Status"
          error={employmentStatusError}
          errorMessage={employmentStatusErrorMessage}
          defaultValue={values.employmentStatus}
        >
          <option value=""> -- Employment Status -- </option>
          <option value="Employed">Employed</option>
          <option value="Self Employed">Self Employed</option>
          <option value="Unemployed">Unemployed</option>
          <option value="Student">Student</option>
        </InputField>
      </div>
      <div className="input_container">
        <InputField 
          name="sourceOfFunds"
          type="select"
          onChange={onChangeHandler}
          label="Source Of Funds"
          placeholder="Source Of Funds"
          error={sourceOfFundsError}
          errorMessage={sourceOfFundsErrorMessage}
          defaultValue={values.sourceOfFunds}
        >
          <option value=""> -- Source Of Funds -- </option>
          <option value="Capital/Savings">Capital/Savings</option>
          <option value="Bonus">Bonus</option>
          <option value="Existing Account">Existing Account</option>
          <option value="Salary">Salary</option>
          <option value="Inheritance">Inheritance</option>
          <option value="Others">Others</option>
        </InputField>
      </div>
      <div className="input_container">
        <InputField 
          name="occupation"
          type="select"
          onChange={onChangeHandler}
          label="Occupation"
          placeholder="Occupation"
          error={occupationError}
          errorMessage={occupationErrorMessage}
          defaultValue={values.occupation}
        >
          {getOccupations()}
        </InputField>
      </div>
      <div className="input_container">
        <InputField 
          name="purposeOfEscrowAccount"
          type="text" 
          onChange={onChangeHandler} 
          label="Purpose Of Escrow Account"
          placeholder="Please state your purpose of opening an EscrowBlock Account"
          error={purposeOfEscrowAccountError}
          errorMessage={purposeOfEscrowAccountErrorMessage}
          defaultValue={values.purposeOfEscrowAccount}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="socialSecurityNumber"
          type="number" 
          onChange={onChangeHandler} 
          label="Social Security Number (Applicable to US Citizens)"
          placeholder="Social Security Number (Applicable to US Citizens)"
          error={socialSecurityNumberError}
          errorMessage={socialSecurityNumberErrorMessage}
          defaultValue={values.socialSecurityNumber}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="expectedTransactionSizePerTrade"
          type="number" 
          onChange={onChangeHandler} 
          label="Expected Transaction Size Per Trade"
          placeholder="Expected Transaction Size Per Trade"
          error={expectedTransactionSizePerTradeError}
          errorMessage={expectedTransactionSizePerTradeErrorMessage}
          defaultValue={values.expectedTransactionSizePerTrade}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="identification"
          type="file" 
          onChange={onChangeHandler} 
          label="Upload Any Government ID (International Passport, Driver's license or any recognized Government ID)"
          error={identificationError}
          errorMessage={identificationErrorMessage}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="proofOfAddress"
          type="file" 
          onChange={onChangeHandler} 
          label="Upload Proof Of Address"
          error={proofOfAddressError}
          errorMessage={proofOfAddressErrorMessage}
        />
      </div>
      <div className="input_container">
        <InputField 
          name="bankStatement"
          type="file" 
          onChange={onChangeHandler} 
          label="Bank Statement"
          error={bankStatementError}
          errorMessage={bankStatementErrorMessage}
        />
      </div>
      <div className="input_container" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        Already a user?<pre>{" "}</pre><Link to="/login" className="login-link">Click here to Login</Link>
        <button 
          className="button gap"
          onClick={SignUp2}
        >
          Submit
        </button>
      </div>
    </form>
  )
}

function getOccupations(){
  return (
    <>
      <option value="">-- select an occupation --</option>
    <optgroup label="Healthcare Practitioners and Technical Occupations:">
      <option value="Chiropractor">-  Chiropractor</option>
      <option value="Dentist">-  Dentist</option>
      <option value="Dietitian or Nutritionist">-  Dietitian or Nutritionist</option>
      <option value="Optometrist">-  Optometrist</option>
      <option value="Pharmacist">-  Pharmacist</option>
      <option value="Physician">-  Physician</option>
      <option value="Physician Assistant">-  Physician Assistant</option>
      <option value="Trader">-  Trader</option>
      <option value="Podiatrist">-  Podiatrist</option>
      <option value="Registered Nurse">-  Registered Nurse</option>
      <option value="Therapist">-  Therapist</option>
      <option value="Veterinarian">-  Veterinarian</option>
      <option value="Health Technologist or Technician">-  Health Technologist or Technician</option>
      <option value="Other Healthcare Practitioners and Technical Occupation">-  Other Healthcare Practitioners and Technical Occupation</option>
    </optgroup>
    <optgroup label="Healthcare Support Occupations:">
      <option value="Nursing, Psychiatric, or Home Health Aide">-  Nursing, Psychiatric, or Home Health Aide</option>
      <option value="Occupational and Physical Therapist Assistant or Aide">-  Occupational and Physical Therapist Assistant or Aide</option>
      <option value="Other Healthcare Support Occupation">-  Other Healthcare Support Occupation</option>
    </optgroup>
    <optgroup label="Business, Executive, Management, and Financial Occupations:">
      <option value="Chief Executive">-  Chief Executive</option>
      <option value="General and Operations Manager">-  General and Operations Manager</option>
      <option value="Advertising, Marketing, Promotions, Public Relations, and Sales Manager">-  Advertising, Marketing, Promotions, Public Relations, and Sales Manager</option>
      <option value="Operations Specialties Manager (e.g., IT or HR Manager)">-  Operations Specialties Manager (e.g., IT or HR Manager)</option>
      <option value="Construction Manager">-  Construction Manager</option>
      <option value="Engineering Manager">-  Engineering Manager</option>
      <option value="Accountant, Auditor">-  Accountant, Auditor</option>
      <option value="Business Operations or Financial Specialist">-  Business Operations or Financial Specialist</option>
      <option value="Business Owner">-  Business Owner</option>
      <option value="Other Business, Executive, Management, Financial Occupation">-  Other Business, Executive, Management, Financial Occupation</option>
    </optgroup>
    <optgroup label="Architecture and Engineering Occupations:">
      <option value="Architect, Surveyor, or Cartographer">-  Architect, Surveyor, or Cartographer</option>
      <option value="Engineer">-  Engineer</option>
      <option value="Other Architecture and Engineering Occupation">-  Other Architecture and Engineering Occupation</option>
    </optgroup>
    <optgroup label="Education, Training, and Library Occupations:">
      <option value="Postsecondary Teacher (e.g., College Professor)">-  Postsecondary Teacher (e.g., College Professor)</option>
      <option value="Primary, Secondary, or Special Education School Teacher">-  Primary, Secondary, or Special Education School Teacher</option>
      <option value="Other Teacher or Instructor">-  Other Teacher or Instructor</option>
      <option value="Other Education, Training, and Library Occupation">-  Other Education, Training, and Library Occupation</option>
    </optgroup>
    <optgroup label="Other Professional Occupations:">
      <option value="Arts, Design, Entertainment, Sports, and Media Occupations">-  Arts, Design, Entertainment, Sports, and Media Occupations</option>
      <option value="Computer Specialist, Mathematical Science">-  Computer Specialist, Mathematical Science</option>
      <option value="Counselor, Social Worker, or Other Community and Social Service Specialist">-  Counselor, Social Worker, or Other Community and Social Service Specialist</option>
      <option value="Lawyer, Judge">-  Lawyer, Judge</option>
      <option value="Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)">-  Life Scientist (e.g., Animal, Food, Soil, or Biological Scientist, Zoologist)</option>
      <option value="Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)">-  Physical Scientist (e.g., Astronomer, Physicist, Chemist, Hydrologist)</option>
      <option value="Religious Worker (e.g., Clergy, Director of Religious Activities or Education)">-  Religious Worker (e.g., Clergy, Director of Religious Activities or Education)</option>
      <option value="Social Scientist and Related Worker">-  Social Scientist and Related Worker</option>
      <option value="Other Professional Occupation">-  Other Professional Occupation</option>
    </optgroup>
    <optgroup label="Office and Administrative Support Occupations:">
      <option value="Supervisor of Administrative Support Workers">-  Supervisor of Administrative Support Workers</option>
      <option value="Financial Clerk">-  Financial Clerk</option>
      <option value="Secretary or Administrative Assistant">-  Secretary or Administrative Assistant</option>
      <option value="Material Recording, Scheduling, and Dispatching Worker">-  Material Recording, Scheduling, and Dispatching Worker</option>
      <option value="Other Office and Administrative Support Occupation">-  Other Office and Administrative Support Occupation</option>
    </optgroup>
    <optgroup label="Services Occupations:">
      <option value="Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)">-  Protective Service (e.g., Fire Fighting, Police Officer, Correctional Officer)</option>
      <option value="Chef or Head Cook">-  Chef or Head Cook</option>
      <option value="Cook or Food Preparation Worker">-  Cook or Food Preparation Worker</option>
      <option value="Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)">-  Food and Beverage Serving Worker (e.g., Bartender, Waiter, Waitress)</option>
      <option value="Building and Grounds Cleaning and Maintenance">-  Building and Grounds Cleaning and Maintenance</option>
      <option value="Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)">-  Personal Care and Service (e.g., Hairdresser, Flight Attendant, Concierge)</option>
      <option value="Sales Supervisor, Retail Sales">-  Sales Supervisor, Retail Sales</option>
      <option value="Retail Sales Worker">-  Retail Sales Worker</option>
      <option value="Insurance Sales Agent">-  Insurance Sales Agent</option>
      <option value="Sales Representative">-  Sales Representative</option>
      <option value="Real Estate Sales Agent">-  Real Estate Sales Agent</option>
      <option value="Other Services Occupation">-  Other Services Occupation</option>
    </optgroup>
    <optgroup label="Agriculture, Maintenance, Repair, and Skilled Crafts Occupations:">
      <option value="Construction and Extraction (e.g., Construction Laborer, Electrician)">-  Construction and Extraction (e.g., Construction Laborer, Electrician)</option>
      <option value="Farming, Fishing, and Forestry">-  Farming, Fishing, and Forestry</option>
      <option value="Installation, Maintenance, and Repair">-  Installation, Maintenance, and Repair</option>
      <option value="Production Occupations">-  Production Occupations</option>
      <option value="Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation">-  Other Agriculture, Maintenance, Repair, and Skilled Crafts Occupation</option>
    </optgroup>
    <optgroup label="Transportation Occupations:">
      <option value="Aircraft Pilot or Flight Engineer">-  Aircraft Pilot or Flight Engineer</option>
      <option value="Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)">-  Motor Vehicle Operator (e.g., Ambulance, Bus, Taxi, or Truck Driver)</option>
      <option value="Other Transportation Occupation">-  Other Transportation Occupation</option>
    </optgroup>
    <optgroup label="Other Occupations:">
      <option value="Military">-  Military</option>
      <option value="Homemaker">-  Homemaker</option>
      <option value="Other Occupation">-  Other Occupation</option>
      <option value="Don't Know">-  Don't Know</option>
      <option value="Not Applicable">-  Not Applicable</option>
    </optgroup>
    </>
  )
}

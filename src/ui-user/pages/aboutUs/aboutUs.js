import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/heading';
import Text1 from '../../components/text1/text1';
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from "axios"
import ReactMarkdown from 'react-markdown';
import Meta from "../../../jsonFiles/meta/meta.json"
const AboutUs = (props) => {
  const { t } = useTranslation();


  const [aboutUsArabic, setAboutUsArabic] = React.useState("");
  const [aboutUsEnglish, setAboutUsEnglish] = React.useState("");



  React.useEffect(() => {

    axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
      response => {
        const detail = response.data;
        setAboutUsArabic(detail.aboutUs);
        setAboutUsEnglish(detail.aboutUsEnglish);
      });
  });


  return (
    <div className="aboutUs">

      <Helmet>
        <title>
          {Meta.aboutUs.title}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={Meta.aboutUs.description} />
      </Helmet>

      <div className="row ">
        <Heading type="h1"> {t("aboutUs.heading")}</Heading>


        <Text1> {t("style.rtl") === "rtl"
          ? <ReactMarkdown>{aboutUsArabic}</ReactMarkdown>
          : <ReactMarkdown>{aboutUsEnglish}</ReactMarkdown>
        }
        </Text1>

      </div>
    </div>
  )
};
export default AboutUs;
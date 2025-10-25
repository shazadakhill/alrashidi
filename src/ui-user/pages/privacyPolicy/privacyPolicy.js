import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/heading';
import Text1 from '../../components/text1/text1';
import ApiURL from '../../../jsonFiles/api/api.json'
import axios from "axios"
import ReactMarkdown from 'react-markdown';
import Meta from "../../../jsonFiles/meta/meta.json"

const PrivacyPolicy = (props) => {
  const { t } = useTranslation();

  const [privacyPolicyArabic, setPrivacyPolicyArabic] = React.useState("");
  const [privacyPolicyEnglish, setPrivacyPolicyEnglish] = React.useState("");


  React.useEffect(() => {

    axios.get(`${ApiURL.domain}${ApiURL.settings}`).then(
      response => {
        const detail = response.data;
        setPrivacyPolicyArabic(detail.privacyPoilicy);
        setPrivacyPolicyEnglish(detail.privacyPoilicyEnglish);

      });
  });




  return (
    <div className="privacyPolicy">

      <Helmet>
        <title>
        {Meta.privacyPolicy.title}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={Meta.privacyPolicy.description} />
      </Helmet>

      <div className="row ">
        <Heading type="h1"> {t("privacyPolicy.heading")}</Heading>


        <Text1> {t("style.rtl") === "rtl"
          ? <ReactMarkdown>{privacyPolicyArabic}</ReactMarkdown>
          : <ReactMarkdown>{privacyPolicyEnglish}</ReactMarkdown>
        }
        </Text1>

      </div>
    </div>
  )
};
export default PrivacyPolicy;
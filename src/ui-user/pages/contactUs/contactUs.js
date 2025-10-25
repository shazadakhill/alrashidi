import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Heading from '../../components/heading/heading';
import "../../../styles/_userStyling/pages/contactUs.scss"
import ContactInfo from '../../containers/contactInfo/contactInfo';
import Meta from "../../../jsonFiles/meta/meta.json"




const ContactUs = (props) => {
  const { t } = useTranslation();

  return (
    <div className="contactUs row">

      <Helmet>
        <title>
          {Meta.contactUs.title}
        </title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={Meta.contactUs.description} />
      </Helmet>


      <Heading type="h1" > {t("contactUs.heading2")}</Heading>
      <ContactInfo></ContactInfo>

    </div>
  )
};
export default ContactUs;
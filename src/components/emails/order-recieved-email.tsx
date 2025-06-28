import { ShippingAddress } from "@prisma/client";
import React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
type Props = {
  shippingAddress: ShippingAddress;
  orderId: string;
  orderDate: string;
};

function OrderReceivedEmail({ shippingAddress, orderId, orderDate }: Props) {
  return (
    <Html>
      <Head></Head>
      <Preview>Your Order Summary and Expected Delivery Date.</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={message}>
            <Heading style={global.heading}>Thank you for your Order!</Heading>
            <Text style={global.text}>
              We're excited to let you know that your order has been received
              and is being processed. Below are the details of your order and
              the expected delivery date will be 2 days from now.
            </Text>
            <Text style={{ ...global.text, marginTop: 24 }}>
              If you have any questions or need assistance, please feel free to
              contact our customer support team at support@example.com or call
              us at 1-800-123-4567. We're available 24/7 to help you with any
              inquiries regarding your order.
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={{ ...global.defaultPadding, ...track.container }}>
            <Text style={addressTitle}>
              Shipping To: {shippingAddress.name}
            </Text>
            <Text style={{ ...global.text, fontSize: 14 }}>
              {shippingAddress.street}, {shippingAddress.city},{" "}
              {shippingAddress.state} {shippingAddress.zip}
            </Text>
          </Section>
          <Hr style={global.hr} />
          <Section style={global.defaultPadding}>
            <Row style={{ display: "inline-flex", marginBottom: 40 }}>
              <Column style={{ width: 170 }}>
                <Text style={global.paragraphWithBold}>Order No.</Text>
                <Text style={track.number}>{orderId}</Text>
              </Column>
              <Column style={{ width: 170 }}>
                <Text style={global.paragraphWithBold}>Order Date.</Text>
                <Text style={track.number}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>
          <Hr style={global.hr} />

          <Section style={paddingY}>
            <Row>
              <Text
                style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}
              >
                Please contact us if you have any questions.(If you reply to
                this email, we may not be able to respond.)
              </Text>
            </Row>
            <Row>
              <Text style={footer.text}>
                &copy; 2023 YouCase Inc. All rights reserved.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

export default OrderReceivedEmail;

const paddingX = {
  paddingLeft: "40px",
  paddingRight: "40px",
};

const paddingY = {
  paddingTop: "22px",
  paddingBottom: "22px",
};

const paragraph = {
  margin: "0",
  lineHeight: "2",
};

const global = {
  paddingX,
  paddingY,
  defaultPadding: {
    ...paddingX,
    ...paddingY,
  },
  paragraphWithBold: { ...paragraph, fontWeight: "bold" },
  heading: {
    fontSize: "32px",
    lineHeight: "1.3",
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: "-1px",
  } as React.CSSProperties,
  text: {
    ...paragraph,
    color: "#747474",
    fontWeight: "500",
  },
  button: {
    border: "1px solid #929292",
    fontSize: "16px",
    textDecoration: "none",
    padding: "10px 0px",
    width: "220px",
    display: "block",
    textAlign: "center",
    fontWeight: 500,
    color: "#000",
  } as React.CSSProperties,
  hr: {
    borderColor: "#E5E5E5",
    margin: "0",
  },
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "10px auto",
  width: "600px",
  maxWidth: "100%",
  border: "1px solid #E5E5E5",
};

const track = {
  container: {
    padding: "22px 40px",
    backgroundColor: "#F7F7F7",
  },
  number: {
    margin: "12px 0 0 0",
    fontWeight: 500,
    lineHeight: "1.4",
    color: "#6F6F6F",
  },
};

const message = {
  padding: "40px 74px",
  textAlign: "center",
} as React.CSSProperties;

const addressTitle = {
  ...paragraph,
  fontSize: "15px",
  fontWeight: "bold",
};

const footer = {
  policy: {
    width: "166px",
    margin: "auto",
  },
  text: {
    margin: "0",
    color: "#AFAFAF",
    fontSize: "13px",
    textAlign: "center",
  } as React.CSSProperties,
};

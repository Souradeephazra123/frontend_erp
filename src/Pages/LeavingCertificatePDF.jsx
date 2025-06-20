// LeavingCertificatePDF.js
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import logoLeft from "../img/WhatsApp Image 2024-07-19 at 15.45.41_45d14541.jpg";
import logoRight from "../img/cbse-logo-46D5A6B556-seeklogo.com.png";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
    fontSize: 12,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  titleContainer: {
    textAlign: "center",
    marginBottom: 10,
  },
  title: {
    color: "#C8102E",
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 5,
  },
  websiteEmail: {
    textAlign: "center",
    marginBottom: 5,
  },
  verticalTableContainer: {
    marginVertical: 20,
    border: "1px solid black",
  },
  verticalTableHeader: {
    flexDirection: "row",
    border: "1px solid black",
  },
  verticalHeaderItem: {
    width: 100, // Adjust width for vertical headers
    height: 250,
    border: "1px solid black",
    padding: 5,
    margin: 0,
    textAlign: "center",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
    fontSize: 10, // Adjust font size as needed
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  verticalTableBody: {
    flexDirection: "row",
  },
  verticalTableBodyItem: {
    width: 100, // Adjust width for vertical body items
    height: 250,
    border: "1px solid black",
    padding: 5,
    margin: 0,
    textAlign: "center",
    writingMode: "vertical-lr",
    transform: "rotate(180deg)",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    fontSize: 10, // Adjust font size as needed
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    fontSize: 10,
  },
  footerText: {
    textAlign: "center",
  },
});

const LeavingCertificatePDF = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.headerContainer}>
        <Image src={logoLeft} style={styles.logo} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>INDURA ENGLISH SCHOOL (CBSE)</Text>
          <Text style={styles.subtitle}>
            Enjangaon (East), Tq, Basmath Dist Hingoli
          </Text>
          <Text style={styles.subtitle}>
            UDISE No.: 27160301903 Affiliation No.: 1131230 School Code: 31217
          </Text>
          <Text style={styles.websiteEmail}>
            Website: www.induraenglishschool.in
          </Text>
          <Text style={styles.websiteEmail}>
            Email: induraenglishschool@gmail.com
          </Text>
        </View>
        <Image src={logoRight} style={styles.logo} />
      </View>
      <View style={styles.verticalTableContainer}>
        <View style={styles.verticalTableHeader}>
          {Object.keys(formData).map((field) => (
            <View key={field} style={styles.verticalHeaderItem}>
              <Text>
                {field
                  .split(/(?=[A-Z])/)
                  .join(" ")
                  .toUpperCase()}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.verticalTableBody}>
          {Object.values(formData).map((value, index) => (
            <View key={index} style={styles.verticalTableBodyItem}>
              <Text>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      <Text style={styles.footerText}>DATE:</Text>
      <View style={styles.footer}>
        <Text>PLACE: IES, Basmath</Text>
        <Text>CLERK’S SIGN</Text>
        <Text>PRINCIPAL’S SIGN</Text>
      </View>
    </Page>
  </Document>
);

export default LeavingCertificatePDF;

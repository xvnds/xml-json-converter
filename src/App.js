import { useState } from "react";
import { Alert, Button, Col, Container, Form, Row} from "react-bootstrap";
import CodeEditor from '@uiw/react-textarea-code-editor';
import { parseString } from "xml2js";

const parser = new DOMParser();
function App() {
  const [xml, setXml] = useState(`
    {
      "sample": "json",
      "arr": [0, 1, 2, 3, 4]
    }
  `);
  const [textareaVal, setTextareaVal] = useState("");
  const [targetTagname, setTargetTagname] = useState("");
  const [error, setError] = useState();

  const onClickConvert = () => {
    try {
      setError();
      if (textareaVal === "") {
        setError("No XML value.");
        return;
      }
      const xmlDoc = parser.parseFromString(textareaVal, "text/xml");
      const responseData = xmlDoc.getElementsByTagName(targetTagname);
      const data = targetTagname !== "" ? responseData[0].textContent : textareaVal;
      parseString(data, (_err, result) => {
        setXml(JSON.stringify(result, null, 4));
      });
    } catch (err) {
      console.log(err);
      setError("Invalid tagname.");
    }
  }

  const onClickClear = () => {
    setTextareaVal("");
    setXml("");
    setTargetTagname("");
    setError();
  }

  return (
    <div className="App">
      <div className="w-100">
        <Container fluid className="p-5">
          <Row>
            <Col><h1>XML to JSON Converter</h1></Col>
          </Row>
          <Row className="mt-4">
            <Col><Form.Control placeholder="Target tag name" onChange={(e) => setTargetTagname(e.target.value)} value={targetTagname}/></Col>
          </Row>
          {error && (
            <Row className="mt-2">
              <Col><Alert variant="danger">{error}</Alert></Col>
            </Row>
          )}
          <Row className="mt-2">
            <Col>
              <textarea className="w-100" rows="30" value={textareaVal} onChange={(e) => setTextareaVal(e.target.value)}/>
              <Row className="mt-3">
                <Col><Button className="w-100" onClick={onClickClear} variant="secondary">Clear</Button></Col>
                <Col>
                  <Button
                    className="w-100"
                    onClick={onClickConvert}
                  >Convert to JSON</Button>
                </Col>
              </Row>
            </Col>
            <Col>
              <CodeEditor
                value={xml}
                language="webmanifest"
                placeholder="JSON result will be shown here"
                onChange={(evn) => setXml(evn.target.value)}
                padding={5}
                style={{
                  fontSize: 14,
                  backgroundColor: "#202020",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                  maxHeight: 790,
                  overflowY: "scroll"
                }}
                minHeight={790}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;

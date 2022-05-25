import { useState } from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import CodeEditor from '@uiw/react-textarea-code-editor';

function App() {
  const [xml, setXml] = useState(`
    {
      "sample": "json",
      "arr": [0, 1, 2, 3, 4]
    }
  `);
  return (
    <div className="App">
      <div className="w-100">
        <Container fluid className="p-5">
          <Row>
            <Col>
              <textarea className="w-100" rows="30"/>
              <Button className="w-100">Hello</Button>
            </Col>
            <Col>
              <textarea className="w-100" rows="20" value={xml} />
              <CodeEditor
                value={xml}
                language="json"
                placeholder="Please enter JS code."
                onChange={(evn) => setXml(evn.target.value)}
                padding={5}
                style={{
                  fontSize: 14,
                  backgroundColor: "#f0f0f0",
                  fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
                }}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default App;

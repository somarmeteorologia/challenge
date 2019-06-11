import React from "react";
import { Container } from "reactstrap";

export const Footer = () => (
  <footer className="app-footer">
    <Container fluid className="container-limited py-3 text-xs">
      <div className="text-right text-muted">
        &copy; 2019{" "}
        <a
          href="https://github.com/luluanacarla"
          className="text-muted"
          target="_blank"
          rel="noopener noreferrer"
        >
          Luana Lima
        </a>
      </div>
    </Container>
  </footer>
);

export default Footer;

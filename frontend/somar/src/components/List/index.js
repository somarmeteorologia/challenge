import React from "react";
import { Table } from "react-bootstrap";
import { Text, Days, TableHeader } from "./styles";

export default function List({ temps }) {
  return (
    <>
      <Table striped bordered hover>
        <TableHeader>
          <tr>
            {temps &&
              temps.map(temp => (
                <th key={temp.day}>
                  <Days>{temp.day}</Days>
                </th>
              ))}
          </tr>
        </TableHeader>
        <tbody>
          <tr>
            {temps &&
              temps.map((temp, i) => (
                <th key={i}>
                  <Text max="true">
                    <i className="fas fa-caret-down" />
                    {temp.tempMax}ºC
                  </Text>
                </th>
              ))}
          </tr>
          <tr>
            {temps &&
              temps.map((temp, i) => (
                <th key={i}>
                  <Text min="true">
                    <i className="fas fa-caret-down" />
                    {temp.tempMin}ºC
                  </Text>
                </th>
              ))}
          </tr>
          <tr>
            {temps &&
              temps.map(temp => (
                <th>
                  <Text min="true" key={temp}>
                    <i className="fas fa-caret-down" />
                    {temp.humidity}
                  </Text>
                </th>
              ))}
          </tr>
        </tbody>
      </Table>
    </>
  );
}

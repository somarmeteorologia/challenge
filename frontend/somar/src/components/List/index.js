import React from "react";
import { Table } from "react-bootstrap";
import { Text, Days, TableHeader, TableBody } from "./styles";

export default function List({ temps }) {
  return (
    <>
      <Table responsive hover size="sm">
        <TableHeader>
          <tr className="header__content">
            {temps &&
              temps.map(temp => (
                <th key={temp.day}>
                  <Days>{temp.day}</Days>
                  <span>{temp.date}</span>
                </th>
              ))}
          </tr>
        </TableHeader>
        <TableBody>
          <tr>
            {temps &&
              temps.map((temp, i) => (
                <th key={i}>
                  <Text max="true">
                    <i className="fas fa-caret-down" />
                    {temp.temp_max}ºC
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
                    {temp.temp_min}ºC
                  </Text>
                </th>
              ))}
          </tr>
          <tr>
            {temps &&
              temps.map(temp => (
                <th>
                  <Text key={temp}>
                    <i className="fas fa-caret-down" />
                    {temp.humidity}%
                  </Text>
                </th>
              ))}
          </tr>
        </TableBody>
      </Table>
    </>
  );
}

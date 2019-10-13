import React from "react";
import moment from "moment";
import Rating from "react-rating";
import { Table } from "react-bootstrap";
import {
  Text,
  Days,
  TableHeader,
  TableBody,
  ContentTable,
  TextHumidity,
  Icon
} from "./styles";

export default function List({ temps }) {
  return (
    <ContentTable>
      <Table responsive hover size="sm">
        <TableHeader className="header__content">
          <tr>
            {temps &&
              temps.map(temp => (
                <th key={temp.day}>
                  <Days today={temp.day === moment().format("dddd")}>
                    {temp.day === moment().format("dddd") ? "HOJE" : temp.day}
                  </Days>
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
                    <i className="fas fa-caret-up" />
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
                  <div className="d-flex flex-row justify-content-center align-items-center">
                    <Rating
                      initialRating={temp.humidity / 10}
                      stop={10}
                      step={2}
                      readonly
                      fullSymbol={<Icon className="far fas fa-tint" active />}
                      emptySymbol={<Icon className="far fas fa-tint" />}
                    />
                    <TextHumidity key={temp} color="#3FA2F7">
                      {temp.humidity}%{console.log(temp.humidity / 10)}
                    </TextHumidity>
                  </div>
                </th>
              ))}
          </tr>
        </TableBody>
      </Table>
    </ContentTable>
  );
}

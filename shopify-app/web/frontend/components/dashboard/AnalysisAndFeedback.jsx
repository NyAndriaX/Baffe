import React from 'react';

import SummaryBlock from './SummaryBlock/SummaryBlock';
import StackedChart from './StackedChart/StackedChart';
import { StyledDiv } from './TableLog/TableLog.styled';
import TableLog from './TableLog/TableLog';

export default function AnalysisAndFeedback() {
  return (
    <StyledDiv>
      <SummaryBlock />
      <br />
      <StackedChart />
      <br />
      <TableLog />
    </StyledDiv>
  );
}

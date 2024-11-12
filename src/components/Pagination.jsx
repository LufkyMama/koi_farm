import React from "react";
import styled from "styled-components";

const Pagination = ({ totalPosts, postPerPage, paginate }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      {pages.map((page, index) => (
        <StyledButton key={index} onClick={() => paginate(page)}>
          {page}
        </StyledButton>
      ))}
    </PaginationWrapper>
  );
};

// Pagination Wrapper to center the buttons
const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center; /* Center the buttons */
  margin-top: 20px; /* Optional spacing above the buttons */
`;

// Styled button component with the new color scheme
const StyledButton = styled.button`
  border: none;
  outline: none;
  background-color: #ff6600; /* Use your desired orange color */
  padding: 10px 20px;
  font-size: 12px;
  font-weight: 700;
  color: #fff;
  border-radius: 5px;
  transition: all ease 0.1s;
  box-shadow: 0px 5px 0px 0px #ff8533;
  margin: 0 5px;

  &:hover {
    background-color: #e65c00; /* Darken on hover */
  }

  &:active {
    transform: translateY(5px);
    box-shadow: 0px 0px 0px 0px #e65c00;
  }
`;

export default Pagination;

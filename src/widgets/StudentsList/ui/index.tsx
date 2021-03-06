import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useStore } from "effector-react";
import Select, { SingleValue } from "react-select";
import SkeletonLoading from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { HeaderContentAdmin, ZeroData } from "shared/ui";
import { Types } from "shared/constants";

import { StudentsModel } from "../model";
import { filterOptions } from "../lib/options";

import "./style.scss";
import { Items } from "./Items";

export const StudentsList = () => {
  const students = useStore(StudentsModel.$students);
  const sortedStudents = useStore(StudentsModel.$sortedStudents);
  const isLoading = useStore(StudentsModel.getStudentsFx.pending);
  const itemsPerPage = 6;
  const [currentItems, setCurrentItems] =
    useState<Array<Types.IProfile> | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    StudentsModel.getStudents();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(sortedStudents.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(sortedStudents.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, sortedStudents]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % sortedStudents.length;
    setItemOffset(newOffset);
  };

  const onChangeFilter = (
    filter: SingleValue<{ value: string; label: string }>
  ) => {
    if (filter) {
      StudentsModel.filterStudents(filter.value);
    }
  };

  if (students.length === 0) {
    return <ZeroData text="Список участников пуст" />;
  }

  return (
    <div className="students">
      <HeaderContentAdmin
        title="Участники"
        select={
          <Select
            onChange={onChangeFilter}
            defaultValue={filterOptions[0]}
            className="react-select-container"
            classNamePrefix="react-select"
            options={filterOptions}
          />
        }
      />
      {sortedStudents.length === 0 ? (
        <ZeroData text="Список участников пуст" />
      ) : (
        <div className="students__table">
          <div className="students__table-head">
            <p>ИФ УЧЕНИКА</p>
            <p>КРАТКАЯ ИНФОРМАЦИЯ</p>
            <p>СТАТУС</p>
          </div>
          {isLoading ? (
            [...new Array(6)].map((_, index) => (
              <div className="students__skeleton" key={`skeleton-${index + 1}`}>
                <SkeletonLoading
                  count={1}
                  width="100%"
                  height="41px"
                  baseColor="#E0E0E0"
                />
              </div>
            ))
          ) : (
            <Items currentItems={currentItems} />
          )}
          {!isLoading && (
            <div className="students__pagination-dots">
              <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                onPageChange={handlePageClick}
                pageRangeDisplayed={1}
                marginPagesDisplayed={1}
                pageCount={pageCount}
                previousLabel="<"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="page-item_active"
                disabledClassName="page-item_disabled"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

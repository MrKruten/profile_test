import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useStore } from "effector-react";
import Select, { SingleValue } from "react-select";
import SkeletonLoading from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { HeaderContentAdmin, ZeroData } from "shared/ui";
import { Student } from "entities/Student";
import { Types } from "shared/lib";

import { filterOptions } from "../lib/options";
import {
  $sortedStudents,
  $students,
  filterStudents,
  getStudents,
  getStudentsFx,
} from "../model";
import "./style.scss";

interface IITems {
  currentItems: Array<Types.IProfile> | null;
}

const Items: React.FC<IITems> = ({ currentItems }) => {
  if (!currentItems) {
    return null;
  }
  return (
    <ul className="students__list">
      {currentItems.map((student, id) => (
        <li key={`${student.firstName}-${student.lastName}-${id + 1}`}>
          <Student
            academyStatus={student.academyStatus}
            firstName={student.firstName}
            lastName={student.lastName}
            profileImage={student.profileImage}
            smallAboutMe={student.smallAboutMe}
            birthDate=""
            gender="male"
            cityOfResidence=""
            favoriteFood={null}
            hasPet={false}
            petType={null}
            petName={null}
            aboutMe=""
          />
        </li>
      ))}
    </ul>
  );
};

export const StudentsList = () => {
  const students = useStore($students);
  const sortedStudents = useStore($sortedStudents);
  const isLoading = useStore(getStudentsFx.pending);
  const itemsPerPage = 6;
  const [currentItems, setCurrentItems] =
    useState<Array<Types.IProfile> | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getStudents();
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
      filterStudents(filter.value);
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
    </div>
  );
};

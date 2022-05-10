import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useStore } from "effector-react";
import Select, { SingleValue } from "react-select";

import { HeaderContentAdmin, ZeroData } from "shared/ui";
import { Student } from "entities/Student";
import { Types } from "shared/lib";

import { filterOptions } from "../lib/options";
import { $students, getStudents } from "../model";
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
  const [sortedStudents, setSortedStudents] = useState(students);
  const itemsPerPage = 6;
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] =
    useState<Array<Types.IProfile> | null>(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(students.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(students.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, students]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % students.length;
    setItemOffset(newOffset);
  };

  const onChangeFilter = (
    filter: SingleValue<{ value: string; label: string }>
  ) => {
    if (filter) {
      if (filter.value === "all") {
        setSortedStudents(students);
        return;
      }
      const newSortedStudents = students.filter(
        (student) => student.academyStatus === filter.value
      );
      setSortedStudents(newSortedStudents);
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
        <Items currentItems={currentItems} />
        <div className="students__pagination">
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
      </div>
    </div>
  );
};

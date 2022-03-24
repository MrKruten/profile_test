import React, { useCallback, useRef } from "react";
import { useList, useStore } from "effector-react";
import Slider from "react-slick";

import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { Comment } from "entities/Comment";
import plus from "shared/images/Plus.svg";
import { ArrowButton, Button } from "shared/ui";
import { showAddComment } from "features/showAddComment/model";
import { $comments } from "features/Comments/model";
import { $isResize } from "features/resize/model";

export const CommentList = () => {
  const isResize = useStore($isResize);
  const commentList = useList($comments, (comment) => (
    <Comment
      name={comment.name}
      avatar={comment.avatar}
      date={comment.date}
      text={comment.text}
    />
  ));

  const slider = useRef<Slider>(null);

  const next = () => {
    slider.current?.slickNext();
  };
  const previous = () => {
    slider.current?.slickPrev();
  };

  const dots = useCallback(() => <div className="dots" />, []);

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    customPaging: dots,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  return (
    <div className="comment-list">
      <div className="comment-list__container">
        <div className="comment-list__header">
          <h2>Отзывы</h2>
          <Button
            onClick={() => {
              showAddComment(true);
            }}
          >
            <>
              <img src={plus} alt="Добавить" />
              {isResize && "Добавить отзыв"}
            </>
          </Button>
        </div>
        <div className="comment-list__swiper">
          <Slider {...settings} ref={slider}>
            {commentList}
          </Slider>
        </div>
      </div>
      {isResize && (
        <div className="comment-list__arrow-buttons">
          <div>
            <ArrowButton onClick={() => previous()} rotated />
            <ArrowButton onClick={() => next()} />
          </div>
        </div>
      )}
    </div>
  );
};

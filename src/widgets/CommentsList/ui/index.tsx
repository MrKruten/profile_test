import React, { useCallback, useRef } from "react";
import { useList, useStore } from "effector-react";
import Slider from "react-slick";

import { Comment, CommentsModel } from "entities/Comment";
import plus from "shared/images/Plus.svg";
import { ArrowButton, Button, Loader } from "shared/ui";
import { AddCommentModel } from "features/AddCommentForm";
import { $isResize } from "shared/lib";

import "./style.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { $publishedComments } from "../model";

export const CommentsList = () => {
  const isLoading = useStore(CommentsModel.getCommentsFx.pending);
  const isResize = useStore($isResize);
  const commentList = useList($publishedComments, (comment) => (
    <Comment
      authorName={comment.authorName}
      authorImage={comment.authorImage ? comment.authorImage! : "None"}
      createdAt={comment.createdAt}
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

  const showModal = () => {
    AddCommentModel.showAddComment(true);
  };

  const onPrevious = () => {
    previous();
  };

  const onNext = () => {
    next();
  };

  return (
    <div className="comment-list">
      <div className="comment-list__container">
        <div className="comment-list__header">
          <h2>Отзывы</h2>
          <Button onClick={showModal} isImg={!isResize}>
            <>
              <img src={plus} alt="Добавить" />
              {isResize && "Добавить отзыв"}
            </>
          </Button>
        </div>
        <div className="comment-list__swiper">
          {isLoading ? (
            <Loader />
          ) : (
            <Slider {...settings} ref={slider}>
              {commentList}
            </Slider>
          )}
        </div>
      </div>
      {isResize && (
        <div className="comment-list__container-arrow-buttons">
          <div className="comment-list__arrow-buttons">
            <ArrowButton onClick={onPrevious} rotated />
            <ArrowButton onClick={onNext} />
          </div>
        </div>
      )}
    </div>
  );
};

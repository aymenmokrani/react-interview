import {
  DeleteTwoTone,
  DislikeFilled,
  DislikeOutlined,
  DislikeTwoTone,
  LikeFilled,
  LikeOutlined,
  LikeTwoTone,
} from "@ant-design/icons/lib/icons";
import { Badge, Card, Progress, Tag } from "antd";
import React from "react";
import { likeMovie, removeMovie } from "../../redux/actions/moviesActions";

function MovieCard({ elements, dispatch, setSelectedCategory }) {
  return (
    <div className="movie-card">
      <Card
        hoverable
        cover={
          <img
            alt="movie-cover"
            src="https://s.studiobinder.com/wp-content/uploads/2017/12/Movie-Poster-Template-Dark-with-Image.jpg"
          />
        }
        actions={[
          <div className="action-button">
            {elements.isLiked !== 1 ? (
              <LikeOutlined
                key="like"
                onClick={() => dispatch(likeMovie(elements.id, 1))}
              />
            ) : (
              elements.isLiked === 1 && (
                <LikeTwoTone
                  key="like"
                  onClick={() => dispatch(likeMovie(elements.id, 0))}
                />
              )
            )}

            <span>
              {elements.likes > 999
                ? (elements.likes / 1000).toFixed(1) + "k"
                : elements.likes}
            </span>
          </div>,
          <div className="action-button">
            {elements.isLiked !== -1 ? (
              <DislikeOutlined
                key="dislike"
                onClick={() => dispatch(likeMovie(elements.id, -1))}
              />
            ) : (
              elements.isLiked === -1 && (
                <DislikeTwoTone
                  twoToneColor="#eb2f96"
                  key="dislike"
                  onClick={() => dispatch(likeMovie(elements.id, 0))}
                />
              )
            )}
            <span>
              {elements.dislikes > 999
                ? (elements.dislikes / 1000).toFixed(1) + "k"
                : elements.dislikes}
            </span>
          </div>,
          <div className="action-button">
            <DeleteTwoTone
              twoToneColor="#eb2f96"
              key="delete"
              onClick={() => {
                setSelectedCategory("all");
                dispatch(removeMovie(elements.id));
              }}
            />
            <span>&nbsp;</span>
          </div>,
        ]}
      >
        <Card.Meta
          title={elements.title}
          description={
            <div>
              <Tag color="blue" key={12} style={{ marginBottom: 10 }}>
                {elements.category}
              </Tag>
              <Progress
                percent={100}
                status="exception"
                success={{
                  percent:
                    (elements.likes / (elements.likes + elements.dislikes)) *
                    100,
                }}
                showInfo={false}
                size="small"
              />
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default MovieCard;

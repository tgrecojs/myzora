import { describe } from "riteway";
import render from "riteway/render-component";

const Post = ({
  title = "default post title",
  body = "default post body",
  featuredImage = {
    src: "/static/logos/tg-logo.png",
    test: "default featured image alt text"
  },
  author = "default author" }) =>
  <div className="wrapper">
    <h3>{title}</h3>
    <img src={featuredImage.src} alt={featuredImage.test} />
    <p>{body}</p>
    <h3>Created by: {author}</h3>
  </div>;

describe("<Post />", async assert => {

  const title = "A guide to pure functions";
  const props = {
    title
  };
  const $ = render(<Post {...props} />);

  assert({
    given: "a title",
    should: "return inside of an <h3> tag",
    actual: $(".wrapper").children().length,
    expected: title
  }) //?


  assert({
    given: "a title",
    should: "return inside of an <h3> tag",
    actual: $("h3").html().trim(),
    expected: title
  }) //?

  assert({
    given: "a title",
    should: "return inside of an <h3> tag",
    actual: $("h3").html().trim(),
    expected: title
  }) //?

})

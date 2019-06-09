import { CompositeDecorator } from "draft-js";
import { findLinkEntities, Link } from "./Hyperlinks";
import { findImageEntities, Image } from "./Images";

const decorator = ({ clickLink }) =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
      props: { clickLink }
    },
    {
      strategy: findImageEntities,
      component: Image
    }
  ]);

export default decorator;

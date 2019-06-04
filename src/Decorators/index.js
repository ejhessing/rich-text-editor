import { CompositeDecorator } from "draft-js";
import { findLinkEntities, Link } from "./Hyperlinks";

const decorator = ({ clickLink }) =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
      props: { clickLink }
    }
  ]);

export default decorator;

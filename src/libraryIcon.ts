import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMessage,
  faAddressBook,
  faUser,
  faRightFromBracket,
  faPlus,
  faBars,
  faCaretDown,
  faArrowRightFromBracket,
  faUserGroup,
  faUserPlus,
  faUserTag,
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/free-solid-svg-icons";

const importIcons = () => {
  library.add(
    faMessage,
    faAddressBook,
    faUser,
    faRightFromBracket,
    faPlus,
    faBars,
    faCaretDown,
    faArrowRightFromBracket,
    faUserGroup,
    faUserPlus,
    faUserTag,
    faEnvelope,
    faEnvelopeOpen
  );
};

export default importIcons;

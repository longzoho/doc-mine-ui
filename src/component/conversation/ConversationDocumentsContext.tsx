import {UserDocument} from "../../types";
import {createContext} from "react";

const ConversationDocumentsContext = createContext([] as UserDocument[]);
export default ConversationDocumentsContext;


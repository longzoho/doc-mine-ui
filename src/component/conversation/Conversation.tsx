import {Expander} from "react-query/types/devtools/Explorer";
import {QuestionAnswer} from "../../types";
import {useContext} from "react";
import {DocumentContext} from "../../page/document/Document";
import {useFirebase} from "../../hook/UseFirebase";

interface ConversationProps {
    conversation_id: string;
    question_answers: QuestionAnswer[];
}
export default (props: ConversationProps) => {
    return <div>Hello</div>;
}
import QuestController from "./QuestController";
import QuestService from "../../services/QuestService";

const questService = new QuestService();
const questController = new QuestController(questService);

export default questController;
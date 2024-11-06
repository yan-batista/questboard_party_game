import PlayerService from "../../services/PlayerServce";
import PlayerController from "./PlayerController";

const playerService: PlayerService = new PlayerService();
const playerController: PlayerController = new PlayerController(playerService);

export default playerController
import { Service, Container } from "typedi";
import { DBManager } from "@modules/db";
import { iTeamRole, TEAM_ROLE_TYPES } from "@crusher-shared/types/db/teamRole";

@Service()
export default class UserTeamRoleService {
	private dbManager: DBManager;

	constructor() {
		this.dbManager = Container.get(DBManager);
	}

	async get(user_id: number, team_id: number): Promise<iTeamRole> {
		return this.dbManager.fetchSingleRow(`SELECT * FROM user_team_roles WHERE user_id = ? AND team_id = ?`, [user_id, team_id]);
	}

	async create(user_id: number, team_id: number, role: TEAM_ROLE_TYPES) {
		return this.dbManager.insert(`INSERT INTO user_team_roles SET ?`, {
			user_id,
			team_id,
			role,
		});
	}

	async update(user_id: number, team_id: number, role: TEAM_ROLE_TYPES) {
		return this.dbManager.fetchAllRows(`UPDATE user_team_roles SET role = ? WHERE user_id = ? AND team_id = ?`, [role, user_id, team_id]);
	}
}

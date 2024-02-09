const db = require('../db/connect');

class Country {
    constructor({country_id, name, capital, population, languages, fun_fact, map_image_url}) {
        this.country_id = country_id;
        this.name = name;
        this.capital = capital;
        this.population = population;
        this.languages = languages;
        this.fun_fact = fun_fact;
        this.map_image_url = map_image_url;
    };

    static async getAll() {
        const response = await db.query("SELECT name FROM country");

        if (response.rows.length === 0) {
            throw new Error("No Countries Available!");
        } else {
            return response.rows.map(c => new Country(c));
        }
    };

    static async getOneByName(name) {
        const response = await db.query("SELECT * FROM country WHERE LOWER($1)=LOWER(name);", [name]);

        if (response.rows.length !== 1) {
            throw new Error("Country Not Found!");
        } else {
            return new Country(response.rows[0]);
        }
    };

    static async create(data) {
        const {name, capital, population, languages, fun_fact = null, map_image_url = null} = data;

        const exists = await db.query("SELECT name FROM country WHERE LOWER($1)=LOWER(name);", [name]);
        
        if (exists.rows.length !== 0) {
            throw new Error ("Country Already Exists!")
        } else {
            const response = await db.query("INSERT INTO country(name, capital, population, languages, fun_fact, map_image_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;", [name, capital, population, languages, fun_fact, map_image_url]);
            return new Country(response.rows[0]);
        }
    };

    async destroy() {
        const response = await db.query("DELETE FROM country WHERE LOWER(name) = LOWER($1) RETURNING *", [this.name]);
        return new Country(response.rows[0]);
    }
};

module.exports = Country;
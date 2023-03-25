export class RickService {
    _apiBase = 'https://rickandmortyapi.com/api/'

    getResource = async (url) => {
        let res = await fetch(url);
        try { return await res.json(); }
        catch (err) {
            new Error(`Could not fetch ${url}, status: ${res.status}`);
        };
    };

    getAllCharacters = async () => {
        const res = await this.getResource(
            `${this._apiBase}character`
        );
        return res.results.map(this._transformCharacter);
    };

    getCharacter = async (id) => {
        const res = await this.getResource(
            `${this._apiBase}character/${id}`
        );
        return this._transformCharacter(res);
    };

    _transformCharacter = (char) => {
        return {
            id: char.id,
            image: char.image,
            name: char.name,
            status: char.status,
            species: char.species,
            gender: char.gender,
            origin: char.origin.name,
            location: char.location.name,
        }
    }
}
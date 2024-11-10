export function BasicInfo() {
  return (
    <div>
      <h2>Basic Information</h2>
      <form>
        <div>
          <label>Name</label>
          <input type="text" required placeholder="Enter your cat's name" />
        </div>
        <div>
          <label>Breed</label>
          <select required>
            <option disabled selected value="">
              Select a breed
            </option>
            <option value="british-shorthair">British Shorthair</option>
            <option value="maine-coon">Maine Coon</option>
            <option value="norwegian-forest">Norwegian Forest</option>
            <option value="bengal">Bengal</option>
            <option value="siamese">Siamese</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="persia ">Persian</option>
            <option value="siameseavannah">Savannah</option>
          </select>
        </div>
        <div>
          <label>Age</label>
          <input type="number" required placeholder="Enter your cat's age" />
        </div>
        <div>
          <label>Weight</label>
          <input type="number" required placeholder="Enter your cat's weight" />
        </div>
        <div>
          <label>Size</label>
          <input type="text" required placeholder="Enter your cat's size" />
        </div>
        <button type="submit">Click here</button>
      </form>
    </div>
  );
}

export function HealthInfo() {
  return (
    <div>
      <h2>Health Information</h2>
      <form>
        <div>
          <label>Dietary Needs</label>
          <select required>
            <option disabled selected value="">
              Select a breed
            </option>
            <option value="british-shorthair">British Shorthair</option>
            <option value="maine-coon">Maine Coon</option>
            <option value="norwegian-forest">Norwegian Forest</option>
            <option value="bengal">Bengal</option>
            <option value="siamese">Siamese</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="persia ">Persian</option>
            <option value="siameseavannah">Savannah</option>
          </select>
        </div>
        <div>
          <label>Medical Conditions</label>
          <select required>
            <option disabled selected value="">
              Select a breed
            </option>
            <option value="british-shorthair">British Shorthair</option>
            <option value="maine-coon">Maine Coon</option>
            <option value="norwegian-forest">Norwegian Forest</option>
            <option value="bengal">Bengal</option>
            <option value="siamese">Siamese</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="persia ">Persian</option>
            <option value="siameseavannah">Savannah</option>
          </select>
        </div>
        <div>
          <label>Vaccination Status</label>
          <select required>
            <option disabled selected value="">
              Select a breed
            </option>
            <option value="british-shorthair">British Shorthair</option>
            <option value="maine-coon">Maine Coon</option>
            <option value="norwegian-forest">Norwegian Forest</option>
            <option value="bengal">Bengal</option>
            <option value="siamese">Siamese</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="persia ">Persian</option>
            <option value="siameseavannah">Savannah</option>
          </select>
        </div>
        <div>
          <label>Spayed/Neutered</label>
          <select required>
            <option disabled selected value="">
              Select a breed
            </option>
            <option value="british-shorthair">British Shorthair</option>
            <option value="maine-coon">Maine Coon</option>
            <option value="norwegian-forest">Norwegian Forest</option>
            <option value="bengal">Bengal</option>
            <option value="siamese">Siamese</option>
            <option value="ragdoll">Ragdoll</option>
            <option value="persia ">Persian</option>
            <option value="siameseavannah">Savannah</option>
          </select>
        </div>
        <button type="submit">Click here</button>
      </form>
    </div>
  );
}

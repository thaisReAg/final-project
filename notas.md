Instalar sass:


# Sass
npm install -D sass-loader sass

# Less
npm install -D less-loader less

# Stylus
npm install -D stylus-loader stylus


Avatares para los profiles de los usuarios: https://beanheads.robertbroersma.com/





Por ahora ya hemos conseguido hacer todo lo que me pedían en el proyecto sobre tareas, así que vamos a empezar un nuevo apartado.

En la página web quiero tener un componente que sea el 'profile' y que aquí se muestre la información del usuario. Quiero que el propio usuario pueda editar estos campos cuando quiera. En supabase tengo los siguientes campos:

name username avatar_url biography email website

Ahora mismo no hay ningún profile registrado. Además me gustaría que los datos se vieran en una especie de tarjeta.

Recuerda que tengo la store de pinia llamada user.js donde puedo crear una función llamada updateProfile por ejemplo.



    async fetchProfile() {
      const { data, error } = await supabase.from("profiles").select().single();
      if (error) {
        this.error = error.message;
      } else {
        this.profile = data;
      }
      this.loading = false;
    },
    async updateProfile(updatedProfile) {
      const { error } = await supabase.from("profiles").upsert(updatedProfile);
      if (error) {
        this.error = error.message;
      } else {
        this.profile = updatedProfile;
      }
      this.loading = false;
    },
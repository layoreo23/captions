export async function POST(req){
    const formData = await req.formData();
    const file = formData.get('file');
    // console.log(file);
    const {name, type} = file.name;
    // const name = file.name;
    return Response.json(file);
}


const page = () => {
  return (
    <div>page</div>
  )
}

export default page



/*

PRIVATE FOLDERS IN NEXT JS
-> Private folders are a way to tell NestJs that this is only for internal stuff
    and do not include in routing system
-> The folder and its subfolders excluded from routing.
-> To create private folder add underscore("_")at the start of folder name
    eg : _lib

Pro's:
-> To keep UI logic seperate from route logic.
-> Consistent way to organise internal files in project.
-> Easier to group files based on relations.
-> Avoiding potential name conflicts

Note: 
-> If we want underscore in URL use "%5F" as a prefix to folder name. That's just the
    URL-encoded version of an underscore
    eg: %5Flib in folder name gives /_lib in route



*/
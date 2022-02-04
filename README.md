# folderst-maker
## Summary
Easy for create multilevel folders and files structures.

```javascript
import { structure, file } from 'folderst-maker'

structure({
  folder1: {
    'inner-folder': {
      'hello.txt': file('Hello')
    }
  },
  folder2: {
    'some-object.json': file({ foo: 'bar' }),
    'some-array.json': file([1, 2, 3])
  }
}, 'path/to/root_dir')
```

## API
### structure

Args
- folders: Folder - object base folder of your folders structure 
- root (Optianal): string - path where structure must create, default value is ``process.cwd()``

Return ``void``

```javascript 
structure(folders, root)
```

### file

Args
- content (Optianal): FileContent - thats will write in file, default value is empty string

Return ``new File``

```javascript
file(content)
```

### Folder Object
Simple JavaScript object where keys must be strings and values another Folder or File.
```javascript
const folders = {
  folder: {
    another_folder: {
      'file.txt': file()
    }
  },
  'example folder': {}
}
```

### File Class
This class has just one property - ``contnet: FileContnet``. You can init new object of this class by ``file`` function.
```javascript
file('some content')
```

### FileContent
May be a ``string``, ``Object`` or ``Array``. While file creating given object or array are transform to text format.
